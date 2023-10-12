#include <stdio.h>
#include <string.h>
#include "esp_timer.h"
#include "esp_log.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
static void periodic_timer_callback(void *arg);
static void periodic_timer2_callback(void *arg);
static const char *TAG = "example";
void periodic_timer_callback(void *param)
{
  ESP_LOGI(TAG, "Hola timer 1.");
}
void periodic_timer2_callback(void *param)
{
  ESP_LOGI(TAG, "Hola timer 2.");
}
void app_main(void)
{
    const esp_timer_create_args_t periodic_timer_args = {
        .callback = &periodic_timer_callback,
        /* name is optional, but may help identify the timer when debugging */
        .name = "periodic"};
    const esp_timer_create_args_t periodic_timer2_args = {
        .callback = &periodic_timer2_callback,
        /* name is optional, but may help identify the timer when debugging */
        .name = "periodic"};
    esp_timer_handle_t periodic_timer;
    esp_timer_handle_t periodic_timer2;
    ESP_ERROR_CHECK(esp_timer_create(&periodic_timer_args, &periodic_timer));
    ESP_ERROR_CHECK(esp_timer_create(&periodic_timer2_args, &periodic_timer2));
    ESP_ERROR_CHECK(esp_timer_start_periodic(periodic_timer, 5000000));
    ESP_ERROR_CHECK(esp_timer_start_periodic(periodic_timer2, 10000000));
    while (true)
    {
        esp_timer_dump(stdout);
        vTaskDelay(pdMS_TO_TICKS(1000));
    }
}
