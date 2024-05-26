[link](https://youtu.be/zJA_tLTd3Vg?si=XMMvCV8mLXML2Cnt&t=4576)

comandos:

- django-admin startproject core . # crear la carpeta core
- python manage.py collectstatic # crea la carpeta estatica
- python manage.py runserver # ejecuta servidor

3. python manage.py migrate

   - Establece un plan o diseño de lo que se quiere cambiar en la DB
   - Aplica los cambios descritos por las migraciones a la DB
   - Ejecuta las migraciones que no han sido aplicadas aún, actualizando la DB para que coincida con los modelos definidos en el código

4. python manage.py makemigrations
   - Lleva a cabo el plan o diseño para la DB
   - Prepara los cambios que se quiere hacer en la estructura de tu DB. Por ejemplo, si agregas un nuevo campo a uno de tus modelos o creas un nuevo modelo
   - Genera archivos en tu proyecto que Django luego se usarán para actualizar la DB. Estos archivos se llaman "migraciones" y son instrucciones sobre cómo modificar la estructura de la DB (como añadir una tabla o columna nueva).

- python manage.py createsuperuser # crea un administrador

Aqui esta la doc de Djoser , para las pruebas en postman
https://djoser.readthedocs.io/en/latest/base_endpoints.html#user-activate

<p>Please go to the following page to activate account:</p>
"http://localhost:8000/activate/uid/token"
