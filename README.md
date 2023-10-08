El siguiente repositorio presenta la comunicación entre el Modulo HELTEC CubeCell LoRa y TTGO ESP32 LoRa
-Para el caso del Heltec CubeCell LoRa se utilizó la libreria LoRawan_app.h que indica el fabricante.
-Para el caso del TTGO ESP32 LoRa se utilizó el entorno de desarrollo ESP-IDF y el uso de components.

La comunicación permite enviar los datos en un estructura, se hizo el testeo con datos int,float y string.
-Se sugiere que las estructuras tengan tamaños consistentes. Es decir que ambos lados la estructura sea
del mismo tamaño.