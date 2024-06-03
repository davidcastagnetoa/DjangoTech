[link](https://youtu.be/zJA_tLTd3Vg?si=V8I0sTRogXOjMn0E&t=10964)

comandos:

- django-admin startproject core . # crear la carpeta core
- python manage.py collectstatic # crea la carpeta estatica
- python manage.py runserver # ejecuta servidor
- python manage.py startapp user ./apps/user # crea un modelo user python manage.py startapp NOMBRE_MODELO RUTA

<!-- - FOR WINDOWS -->

- `pg_ctl -D "C:\Users\username\AppData\Local\Programs\PostgreSQL\data" start` #Inicia el servidor
- `cd /c/Users/username/AppData/Local/Programs/PostgreSQL/bin/ && pg_ctl -D ../data/ start`
- `createuser -s postgres` # Crear un superusuario
- `psql -U davidcastagnetoa -d djangoStore` # Conectarse a la DB postgres con el usuario davidcastagnetoa
- `psql -U postgres` # Acceder a PostgreSQL
- http://localhost/pgadmin4/browser/

<!-- - FOR BASH -->

- `psql -U username -d djangoStore` # accede a la consola de postgres , a la base de datos 'djangoStore' como username
- `\dt` # Para ver las tablas
- `\l+ djangoStore` # verificar los permisos del usaurio en la DB 'djangoStore'
- `\dp user_useraccount` # verificar los permisos sobre la tabla específica
- `SELECT * FROM public.user_useraccount ORDER BY id ASC;`; # Para ver la tabla user_useraccount.
- `GRANT SELECT ON TABLE public.user_useraccount TO davidcastagnetoa;` # Otorgar permisos necesarios a usuario

- pg_ctl register -N "PostgreSQL" -D "C:\Users\username\AppData\Local\Programs\PostgreSQL\data" # Configurar PostgreSQL para iniciar automáticamente

3. python manage.py migrate

   - Establece un plan o diseño de lo que se quiere cambiar en la DB
   - Aplica los cambios descritos por las migraciones a la DB
   - Ejecuta las migraciones que no han sido aplicadas aún, actualizando la DB para que coincida con los modelos definidos en el código

4. python manage.py makemigrations

   - Lleva a cabo el plan o diseño para la DB
   - Prepara los cambios que se quiere hacer en la estructura de tu DB. Por ejemplo, si agregas un nuevo campo a uno de tus modelos o creas un nuevo modelo
   - Genera archivos en tu proyecto que Django luego se usarán para actualizar la DB. Estos archivos se llaman "migraciones" y son instrucciones sobre cómo modificar la estructura de la DB (como añadir una tabla o columna nueva).

- python manage.py createsuperuser # crea un administrador , o por defecto se puede hacer con la consola de psql

Aqui esta la doc de Djoser , para las pruebas en postman
https://djoser.readthedocs.io/en/latest/base_endpoints.html#user-activate

<p>Please go to the following page to activate account:</p>
"http://localhost:8000/activate/uid/token"
