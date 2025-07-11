#Docker 
# Back up and restore data
You can use the following procedure to save and restore images and container data. For example to reset your VM disk or to move your Docker environment to a new computer.

## Save your data[](https://docs.docker.com/desktop/backup-and-restore/#save-your-data)

1.  If you have containers that contain data that must be backed up, commit those containers to an image with [`docker container commit`](https://docs.docker.com/engine/reference/commandline/commit/).
    
    Committing a container stores the container filesystem changes and some of the container’s configuration (labels, environment-variables, command/entrypoint) as a local image. Be aware that environment variables may contain sensitive information such as passwords or proxy-authentication, so care should be taken when pushing the resulting image to a registry.
    
    Also note that filesystem changes in volume that are attached to the container are not included in the image, and must be backed up separately (see step 3 below).
    
    Refer to the [`docker container commit` page](https://docs.docker.com/engine/reference/commandline/commit/) in the Docker Engine command line reference section for details on using this command.
    
    > Should I back up my containers?
    > 
    > If you use volumes or bind-mounts to store your container data, backing up your containers may not be needed, but make sure to remember the options that were used when creating the container or use a [Docker Compose file](https://docs.docker.com/compose/compose-file/) if you want to re-create your containers with the same configuration after re-installation.
    
2.  Use [`docker push`](https://docs.docker.com/engine/reference/commandline/push/) to push any images you have built locally and want to keep to the [Docker Hub registry](https://docs.docker.com/docker-hub/). Make sure to configure the [repository’s visibility as “private”](https://docs.docker.com/docker-hub/repos/#private-repositories) for images that should not be publicly accessible. Refer to the [`docker push` page](https://docs.docker.com/engine/reference/commandline/push/) in the Docker Engine command line reference section for details on using this command.
    
    Alternatively, use [`docker image save -o images.tar image1 [image2 ...]`](https://docs.docker.com/engine/reference/commandline/save/) to save any images you want to keep to a local tar file. Refer to the [`docker image save` page](https://docs.docker.com/engine/reference/commandline/save/) in the Docker Engine command line reference section for details on using this command.
    
3.  If you use [named volume](https://docs.docker.com/storage/#more-details-about-mount-types) to store container data, such as databases, refer to the [backup, restore, or migrate data volumes](https://docs.docker.com/storage/volumes/#backup-restore-or-migrate-data-volumes) page in the storage section.
    

After backing up your data, you can uninstall the current version of Docker Desktop and install a different version ([Windows](https://docs.docker.com/desktop/windows/install/) [macOS](https://docs.docker.com/desktop/mac/install/), or reset Docker Desktop to factory defaults.

## Restore your data[](https://docs.docker.com/desktop/backup-and-restore/#restore-your-data)

1.  Use [`docker pull`](https://docs.docker.com/engine/reference/commandline/load/) to restore images you pushed to Docker Hub in “step 2.” in the [save your data section](https://docs.docker.com/desktop/backup-and-restore/#save-your-data)
    
    If you backed up your images to a local tar file, use [`docker image load -i images.tar`](https://docs.docker.com/engine/reference/commandline/load/) to restore previously saved images.
    
    Refer to the [`docker image load` page](https://docs.docker.com/engine/reference/commandline/load/) in the Docker Engine command line reference section for details on using this command.
    
2.  Refer to the [backup, restore, or migrate data volumes](https://docs.docker.com/storage/volumes/#backup-restore-or-migrate-data-volumes) page in the storage section to restore volume data.
3.  Re-create your containers if needed, using [`docker run`](https://docs.docker.com/engine/reference/commandline/load/), or [Docker Compose](https://docs.docker.com/compose/).