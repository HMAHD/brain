#Docker 
# Configure GitHub Actions
This page guides you through the process of setting up a GitHub Action CI/CD pipeline with Docker. Before setting up a new pipeline, we recommend that you take a look at [Ben’s blog](https://www.docker.com/blog/best-practices-for-using-docker-hub-for-ci-cd/) on CI/CD best practices.

This guide contains instructions on how to:

1.  Use a sample Docker project as an example to configure GitHub Actions.
2.  Set up the GitHub Actions workflow.
3.  Optimize your workflow to reduce build time.
4.  Push only specific versions to Docker Hub.

## Set up a Docker project[](https://docs.docker.com/ci-cd/github-actions/#set-up-a-docker-project)

Let’s get started. This guide uses a simple Docker project as an example. The [SimpleWhaleDemo](https://github.com/usha-mandya/SimpleWhaleDemo) repository contains a Nginx alpine image. You can either clone this repository, or use your own Docker project.

![SimpleWhaleDemo](https://docs.docker.com/ci-cd/images/simplewhaledemo.png)

Before we start, ensure you can access [Docker Hub](https://hub.docker.com/) from any workflows you create. To do this:

1.  Add your Docker ID as a secret to GitHub. Navigate to your GitHub repository and click **Settings** > **Secrets** > **New secret**.
    
2.  Create a new secret with the name `DOCKER_HUB_USERNAME` and your Docker ID as value.
    
3.  Create a new Personal Access Token (PAT). To create a new token, go to [Docker Hub Settings](https://hub.docker.com/settings/security) and then click **New Access Token**.
    
4.  Let’s call this token **simplewhaleci**.
    
    ![New access token](https://docs.docker.com/ci-cd/images/github-access-token.png)
    
5.  Now, add this Personal Access Token (PAT) as a second secret into the GitHub secrets UI with the name `DOCKER_HUB_ACCESS_TOKEN`.
    
    ![GitHub Secrets](https://docs.docker.com/ci-cd/images/github-secrets.png)
    

## Set up the GitHub Actions workflow[](https://docs.docker.com/ci-cd/github-actions/#set-up-the-github-actions-workflow)

In the previous section, we created a PAT and added it to GitHub to ensure we can access Docker Hub from any workflow. Now, let’s set up our GitHub Actions workflow to build and store our images in Hub.

In this example, let us set the push flag to `true` as we also want to push. We’ll then add a tag to specify to always go to the latest version. Lastly, we’ll echo the image digest to see what was pushed.

To set up the workflow:

1.  Go to your repository in GitHub and then click **Actions** > **New workflow**.
2.  Click **set up a workflow yourself** and add the following content:

First, we will name this workflow:

```
name: ci
```

Then, we will choose when we run this workflow. In our example, we are going to do it for every push against the main branch of our project:

```
on:
  push:
    branches:
      - 'main'
```

Now, we need to specify what we actually want to happen within our workflow (what jobs), we are going to add our build one and select that it runs on the latest Ubuntu instances available:

```
jobs:
  build:
    runs-on: ubuntu-latest
```

Now, we can add the steps required:

-   The first one checks-out our repository under `$GITHUB_WORKSPACE`, so our workflow can access it.
-   The second one will use our PAT and username to log into Docker Hub.
-   The third will setup Docker Buildx to create the builder instance using a BuildKit container under the hood.

```
    steps:
      -
        name: Checkout 
        uses: actions/checkout@v2
      -
        name: Login to Docker Hub
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKER_HUB_USERNAME }}
          password: ${{ secrets.DOCKER_HUB_ACCESS_TOKEN }}
      -
        name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v1
      -
        name: Build and push
        uses: docker/build-push-action@v2
        with:
          context: .
          file: ./Dockerfile
          push: true
          tags: ${{ secrets.DOCKER_HUB_USERNAME }}/simplewhale:latest
```

Now, let the workflow run for the first time and then tweak the Dockerfile to make sure the CI is running and pushing the new image changes:

![CI to Docker Hub](https://docs.docker.com/ci-cd/images/ci-to-hub.png)

## Optimizing the workflow[](https://docs.docker.com/ci-cd/github-actions/#optimizing-the-workflow)

Next, let’s look at how we can optimize the GitHub Actions workflow through build cache using the registry. This allows to reduce the build time as it will not have to run instructions that have not been impacted by changes in your Dockerfile or source code and also reduce number of pulls we complete against Docker Hub.

In this example, we need to add some extra attributes to the build and push step:

```
      -
        name: Login to Docker Hub
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKER_HUB_USERNAME }}
          password: ${{ secrets.DOCKER_HUB_ACCESS_TOKEN }}
      -
        name: Build and push
        uses: docker/build-push-action@v2
        with:
          context: ./
          file: ./Dockerfile
          builder: ${{ steps.buildx.outputs.name }}
          push: true
          tags: ${{ secrets.DOCKER_HUB_USERNAME }}/simplewhale:latest
          cache-from: type=registry,ref=${{ secrets.DOCKER_HUB_USERNAME }}/simplewhale:buildcache
          cache-to: type=registry,ref=${{ secrets.DOCKER_HUB_USERNAME }}/simplewhale:buildcache,mode=max
```

As you can see, we are using the `type=registry` cache exporter to import/export cache from a cache manifest or (special) image configuration. Here it will be pushed as a specific tag named `buildcache` for our image build.

Now, run the workflow again and verify that it uses the build cache.

## Push tagged versions and handle pull requests[](https://docs.docker.com/ci-cd/github-actions/#push-tagged-versions-and-handle-pull-requests)

Earlier, we learnt how to set up a GitHub Actions workflow to a Docker project, how to optimize the workflow by setting up cache. Let’s now look at how we can improve it further. We can do this by adding the ability to have tagged versions behave differently to all commits to master. This means, only specific versions are pushed, instead of every commit updating the latest version on Docker Hub.

You can consider this approach to have your commits pushed as an edge tag to then use it in nightly tests. By doing this, you can always test the last changes of your active branch while reserving your tagged versions for release to Docker Hub.

First, let us modify our existing GitHub workflow to take into account pushed tags and pull requests:

```
on:
  push:
    branches:
      - 'main'
    tags:
      - 'v*'
```

This ensures that the CI will trigger your workflow on push events (branch and tags). If we tag our commit with something like `v1.0.2`:

```
$ git tag -a v1.0.2
$ git push origin v1.0.2
```

Now, go to GitHub and check your Actions

![Push tagged version](https://docs.docker.com/ci-cd/images/push-tagged-version.png)

Let’s reuse our current workflow to also handle pull requests for testing purpose but also push our image in the GitHub Container Registry.

First we have to handle pull request events:

```
on:
  push:
    branches:
      - 'main'
    tags:
      - 'v*'
  pull_request:
    branches:
      - 'main'
```

To authenticate against the [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry), use the [`GITHUB_TOKEN`](https://docs.github.com/en/actions/reference/authentication-in-a-workflow) for the best security and experience.

Now let’s change the Docker Hub login with the GitHub Container Registry one:

```
        if: github.event_name != 'pull_request'
        uses: docker/login-action@v1
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
```

Remember to change how the image is tagged. The following example keeps ‘latest’ as the only tag. However, you can add any logic to this if you prefer:

```
  tags: ghcr.io/<username>/simplewhale:latest
```

> **Note**: Replace `<username>` with the repository owner. We could use `${{ github.repository_owner }}` but this value can be mixed-case, so it could fail as [repository name must be lowercase](https://github.com/docker/build-push-action/blob/master/TROUBLESHOOTING.md#repository-name-must-be-lowercase).

![Update tagged images](https://docs.docker.com/ci-cd/images/ghcr-logic.png)

Now, we will have two different flows: one for our changes to master, and one for our pushed tags. Next, we need to modify what we had before to ensure we are pushing our PRs to the GitHub registry rather than to Docker Hub.

## Conclusion[](https://docs.docker.com/ci-cd/github-actions/#conclusion)

In this guide, you have learnt how to set up GitHub Actions workflow to an existing Docker project, optimize your workflow to improve build times and reduce the number of pull requests, and finally, we learnt how to push only specific versions to Docker Hub.