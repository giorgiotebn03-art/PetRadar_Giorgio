
resource "azurerm_resource_group" "radar_rg" {
  name     = "radar-rg-${var.ENVIRONMENT}"
  location = var.LOCATION
}

resource "azurerm_application_insights" "radar_ai" {
  name                = "radar-api-telemetry-${var.ENVIRONMENT}"
  location            = var.LOCATION
  resource_group_name = azurerm_resource_group.radar_rg.name
  application_type    = "web"
}
