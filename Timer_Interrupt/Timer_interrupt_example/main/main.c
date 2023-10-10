#include <stdio.h>
#include "esp_system.h"
#include "esp_timer.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_log.h"
#include "driver/gpio.h"
esp_timer_handle_t timer_handler;
void timer_callback(void *param)
{
  ESP_ERROR_CHECK(esp_timer_stop(timer_handler));
  static bool ON;
  ON = !ON;
  ESP_ERROR_CHECK(esp_timer_start_periodic(timer_handler, 500000));
  gpio_set_level(GPIO_NUM_2, ON);
}


void app_main(void)
{
    const esp_timer_create_args_t my_timer_args = {
      .callback = &timer_callback,
      .name = "My Timer"};
    gpio_set_direction(GPIO_NUM_2, GPIO_MODE_OUTPUT);
    ESP_ERROR_CHECK(esp_timer_create(&my_timer_args, &timer_handler));
    ESP_ERROR_CHECK(esp_timer_start_periodic(timer_handler, 10000000));
  while (true)
  {
    esp_timer_dump(stdout);
    vTaskDelay(pdMS_TO_TICKS(1000));
  }
}