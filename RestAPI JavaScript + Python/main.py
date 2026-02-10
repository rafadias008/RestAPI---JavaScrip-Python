from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

#iniciar o servidor -> python -m uvicorn main:app --reload

app = FastAPI()
############################## INICIA SERVIDOR ################################
# Servir tudo que estiver em /static (css, js, imagens, etc.)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Rota que abre a "aba" HTML (index.html)
@app.get("/")
def home():
    return FileResponse("static/index.html")

###################################### LISTAS DE TESTE #######################

list_cars = list()

###################################### CLASSES ################################

class Car(BaseModel):
    car_id: int
    car_model: str
    car_maker: str
    car_year: int
    car_kilometers: float
    car_price: float
    car_color: str

###################################### GERANDO API REST #######################

#Rota para listar os carros cadastrados
@app.get('/produtos')
def get_produtos():
    return list_cars

#Rota para listar um carro específico, passando o id do carro na URL
@app.get('/produtos/{car_id}')
def get_produtos(car_id: int):
    for car in list_cars:
        if car.car_id == car_id:
            return car


#Rota para adicionar um carro, passando os dados do carro no corpo da requisição (JSON)
@app.post('/produtos/addcar/')
def add_car(car: Car):
    list_cars.append(car)
    return {'message': 'Carro adicionado com sucesso!' + str(car)}

#Rota para deletar um carro, passando o id do carro na URL (Não implementada)
@app.delete('/produtos/deletecar/{car_id}')
def delete_car(car_id:int):
    for car in list_cars:
        if car.car_id == car_id:
            list_cars.remove(car)
            return {'message': 'Carro deletado com sucesso!'}
    return {'message': 'Carro não encontrado!'}