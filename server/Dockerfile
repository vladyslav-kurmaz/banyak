FROM python:3.10

RUN mkdir /banyak

WORKDIR /banyak

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

VOLUME ["/banyak/avatars/"]
VOLUME ["/banyak/military/"]
VOLUME ["/banyak/vpo/"]

CMD ["sh", "-c", "python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8080"]
