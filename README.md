## pasos para levantar proyecto


1-ejecutar npm install


2-configurar variables de entorno

    ## generar discork webhook url:
     a-Crear servidor de discord
     b-ir a configuracion de servidor>integraciones>webooks
     c-crear nuevo webook (bot) y copiar link generado

3-ejecutar npm run dev

4-ir a cmd en modo administrador y correr el comando ngrok http 3000

5-copiar el link generado por ngrok y ponerlo en la configuracion de nuestro repositorio de github