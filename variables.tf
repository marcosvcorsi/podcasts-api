variable "cluster_name" {
  description = "Name of ECS cluster"
  type        = string
  default     = "default"
}

variable "service_name" {
  description = "Name of ECS Service"
  type        = string
  default     = "podcasts-api-service"
}

variable "image_tag" {
  description = "Image tag version"
  type        = string
  default     = "latest"
}
