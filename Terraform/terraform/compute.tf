resource "azurerm_linux_virtual_machine" "radar_vm" {
  name                = "vm-radar-api-${var.ENVIRONMENT}"
  resource_group_name = azurerm_resource_group.radar_rg.name
  location            = var.LOCATION
  size                = var.VM_SIZE
  admin_username      = "adminuser"
  custom_data = filebase64("./scripts/docker-install.tpl")
  network_interface_ids = [    
    azurerm_network_interface.radar_nic.id,
  ]
  
  admin_ssh_key {
    username   = "adminuser"
    public_key = file("./keys/radar_key.pub")
  }
  
  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
    }
    
   source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts-gen2"
    version   = "latest"
    }
}