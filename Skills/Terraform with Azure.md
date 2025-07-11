# Setting up the environment
1. download and install [Azure cli ](https://learn.microsoft.com/en-us/cli/azure/)
2. open vs code an₫ go to terminal
3. login to azure account by *`az login`* or *`az login --use-device-code`* it will prompt a login link and code.
4. after login validate `az account show`
5. install terraform extension in vs code.
   ==terraform - Anton Kulikov==
6. create a folder "terraform-azure" in file explorer and open it in vs code

## initiate
1. create a file in that folder "main.tf"
2. go to [azure terraform document](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs) and go to [usage section](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs#example-usage) for main code. 
```hcl
# Azure Provider source and version being used
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.0"
    }
  }
}

# Configure the Microsoft Azure Provider
provider "azurerm" {
  features {}
}
```
3. now go to terminal and type `terraform fmt` it will format the code ([hcl code formatting](https://github.com/hashicorp/hcl))
4. next *`terraform init`* it will initialize backend and get the state and store in local. it will create 2 new files,
	- terraform\providers\registry.terraform.io\hashicorp\azurerm
	- terraform.lock.hd

*1st file is provide terraform directory and where the code is compile, also communicate with azure api*
*2nd file maintain the terraform version*

> (`*terraform init*` command only look for the provider for configuration it does not check other code and shows errors ) - `provider "azurerm"`

## Resources
1. to add resources to terraform configuration go to "main.tf" file and  
``` hcl
resource "azurerm_resource_group" "mtc-rg" {
  name     = "mtc-resources"
  location = "southeast asia"  #singapore
  tags ={
	  environment = "dev"
  }
 }
```

2. after that *`terraform fmt`* to format the code.
3. next run *`terraform plan`* it will preview what we gonna change.
4. next `terraform apply` to apply those configuration.
5. it will prompt 
> 	do you want to perform these actions?

	*we need to give yes to that or we can use auto approve flag like this,*
	*`terraform apply-auto-aprove*`*

next we have to groundwork by creating virtual network before that we need to know about references, attributes of other resources.

## Virtual Network
1. again we have to crate a resource for VN in **main.tf** file
```hcl
resource "azurerm_virtual_network" "mtc-vn" {
  name                = "mtc-network"
  location            = azurerm_resource_group.mtc-rg.location
  resource_group_name = azurerm_resource_group.mtc-rg.name
  address_space       = ["10.123.0.0/16"]

  tags = {
    environment = "dev"
  }
}
```

*resource_group_name = azurerm_resource_group.==mtc-rg==.name*
this is the resource group we created earlier we define it here so the virtual network is on that group also, VN dependent on that resource group.

2. after that *`terraform fmt`* to format the code.
3. next run *`terraform plan`* it will preview what we gonna change.
4. next `terraform apply-auto-aprove` to apply those configuration.

If we see in the vs code there is 2 new files,
- terraform.tfstate
- terraform.tfstate.backup

> we do not manually change those state files. there is few occasion's we need too otherwise we do not, and shouldn't have write access to if it is in remote server

*terraform.tfstate* is a file that stores, terraform configurations we applied.and *terraform.tfstate.backup* file create backup state when *terraform.tfstate* file changed.

### Terraform Status
there is a another way to see status, not like what we did before.
1. go to terminal and type `terraform state list` it shows the all available resources we created so far.
2. we can see detail about specific resources in those resources by `terraform state show azurerm_resource_group.mtc-rg` it will show all configurations about *azurerm_resource_group.mtc-rg* we can see all other recourse's like wise.
3. `terraform show` code will show entire status.

(`terraform show` - for all status and `terraform state show example` - for specific status)

### Delete resources
1. to delete we can use `terraform destroy` or `terraform apply -destroy` command (it will delete all resources we created)
2. also we can plan destroy command (preview of what's going to destroy) `terraform plan-destroy`

(After destroy we can get everything back to normal by `terraform apply -auto-approve`) because code will not destroy so we already have configurations apply those again will be the solution.

## Subnet

1. again we create resource for subnet in main.tf
```hcl
resource "azurerm_subnet" "mtc-subnet" {
  name                 = "mtc-subnet"
  resource_group_name  = azurerm_resource_group.mtc-rg.name
  virtual_network_name = azurerm_virtual_network.mtc-vn.name
  address_prefixes     = ["10.123.1.0/24"]
}
```
2. after that *`terraform fmt`* to format the code.
3. next run *`terraform plan`* it will preview what we gonna change.
4. next `terraform apply-auto-aprove` to apply those configuration.

we can see it in azure : *resource group > mtc-network > subnets > mtc-subnet*

## Security group

*security_rule* can be configured inline and via the separate *azurerm_network_security_rule* resource. lets do it as a separate resource.

1. lets go to **main.tf** file and start creating resource for security group.
```hcl
resource "azurerm_network_security_group" "mtc-sg" {
  name                = "mtc-security-group"
  location            = azurerm_resource_group.mtc-rg.location
  resource_group_name = azurerm_resource_group.mtc-rg.name

  tags = {
    environment = "dev"
  }
}
resource "azurerm_network_security_rule" "mtc-dev-rule" {
  name                        = "mtc-dev-rule"
  priority                    = 100
  direction                   = "inbound"
  access                      = "Allow"
  protocol                    = "*"
  source_port_range           = "*"
  destination_port_range      = "*"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
  resource_group_name         = azurerm_resource_group.mtc-rg.name
  network_security_group_name = azurerm_network_security_group.mtc-sg.name
}
```
2. after that *`terraform fmt`* to format the code.
3. next run *`terraform plan`* it will preview what we gonna change.
4. next `terraform apply-auto-aprove` to apply those configuration.
5. now we can see those resources by `terraform state list`

## subnet_group & Network_security_group Association

1. lets go to **main.tf** file and start creating resource.
```hcl
resource "azurerm_subnet_network_security_group_association" "mtc-sga" {
  subnet_id                 = azurerm_subnet.mtc-subnet.id
  network_security_group_id = azurerm_network_security_group.mtc-sg.id
}
```
2. after that *`terraform fmt`* to format the code.
3. next run *`terraform plan`* it will preview what we gonna change.
4. next `terraform apply-auto-aprove` to apply those configuration.

## Public ip

this is how we manages the public ip address.
1. lets go to **main.tf** file and start creating resource.
```hcl
resource "azurerm_public_ip" "mtc-ip" {
  name                = "mtc-ip"
  resource_group_name = azurerm_resource_group.mtc-rg.name
  location            = azurerm_resource_group.mtc-rg.location
  allocation_method   = "Dynamic"

  tags = {
    environment = "dev"
  }
}
```
2. after that *`terraform fmt`* to format the code.
3. next run *`terraform plan`* it will preview what we gonna change.
4. next `terraform apply-auto-aprove` to apply those configuration.
5. now we `terraform state list` and `terraform state show aazurerm_linux_virtual_machine.mtc-ip` to view. we can see our public ip not assigned we can fix it by follow bellow.

## Network interface

1. lets go to **main.tf** file and start creating resource.
```hcl
resource "azurerm_network_interface" "mtc-nic" {
  name                = "mtc-nic"
  location            = azurerm_resource_group.mtc-rg.location
  resource_group_name = azurerm_resource_group.mtc-rg.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.mtc-subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.mtc-ip.id
  }
  tags = {
	  environment = "dev"
  }
}
```
2. after that *`terraform fmt`* to format the code.
3. next run *`terraform plan`* it will preview what we gonna change.
4. next `terraform apply-auto-aprove` to apply those configuration.

## Virtual machine

1. lets go to **main.tf** file and start creating resource.
```hcl
resource "azurerm_linux_virtual_machine" "mtc-vm" {
  name                = "mtc-vm"
  resource_group_name = azurerm_resource_group.mtc-rg.name
  location            = azurerm_resource_group.mtc-rg.location
  size                = "Standard_B1s"
  admin_username      = "adminuser"
  network_interface_ids = [
    azurerm_network_interface.mtc-nic.id,
  ]

  admin_ssh_key {
    username   = "adminuser"
    public_key = file("~/.ssh/mtcazurekey.pub") 
  }
  // ssh configuration is bellow

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts"
    version   = "latest"
  }
}
```

This is how to configure the ssh key pair. we do it because without that ip address will not be assigned.
- create ssh key - `ssh-keygen -t rsa`
- after that location to save (in my case) - `C:\users\akash\.ssh\mtcazurekey`
- to view key - `ls ~/.ssh`

2. after that *`terraform fmt`* to format the code.
3. next run *`terraform plan`* it will preview what we gonna change.
4. next `terraform apply-auto-aprove` to apply those configuration.
5. now we `terraform state list` and `terraform state show aazurerm_linux_virtual_machine.mtc-vm` to view. now we can see our public ip.

- Now we can login to our vm via ssh
	`ssh -i ~/.ssh/mtcazurekey adminuser@52.170.30.10` //followed by the ip
- We can see info by  - `lsb_release -a`





