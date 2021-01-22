from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse
from .models import PizzaTable
from .serializers import PizzaTableSerializers
from rest_framework import response
from rest_framework.decorators import api_view

def getHomePage(request):
    return render(request, 'PizzaHomePage.html')

@csrf_protect
@csrf_exempt
def savePizzaData(request):
    responseData = {}
    pizzaType = request.POST.get("type")
    pizzaSize = request.POST.get("size")
    pizzaToppings = request.POST.get("toppings")
    dbState = PizzaTable(type=pizzaType, size=pizzaSize, toppings=pizzaToppings)
    dbState.save()
    responseData['message'] = 'Success'
    return JsonResponse(responseData)

@csrf_protect
@csrf_exempt
def getPizzaData(request):
    filterPizzaType = request.POST.get('type')
    filterPizzaSize = request.POST.get('size')
    query = ''
    if (filterPizzaType != 'None'):
        query = "WHERE type = '" + (filterPizzaType) + "'"
        if (filterPizzaSize != 'None'):
            query = query + "AND size = '" + str(filterPizzaSize) + "'"
    elif (filterPizzaSize != 'None'):
        query = "WHERE size = '" + filterPizzaSize + "'"
        if (filterPizzaType != 'None'):
            query = query + "AND type = '" + filterPizzaType + "'"

    responseData = {}
    if (len(query) != 0):
        data = PizzaTable.objects.raw("select * from pizza_pizzatable " + query)
    else :
        data = PizzaTable.objects.raw("select * from pizza_pizzatable")
    print(data)
    dataSer = PizzaTableSerializers(data, many= True)
    dataList = makeDBData(data)
    responseData['data'] = dataSer.data
    responseData['message'] = 'Success'
    return JsonResponse(responseData)

def makeDBData(data):
    dataList = []
    for val in range(data.__len__()):
        dataDict = {}
        dataDict['id'] = data[val].id
        dataDict['type'] = data[val].type
        dataDict['size'] = data[val].size
        dataDict['toppings'] = data[val].toppings
        dataList.append(dataDict)
    return dataList

@csrf_protect
@csrf_exempt
#cross Site request forgery
def deletePizzaData(request):
    responseData = {}
    pizzaId = request.POST.get("id")
    PizzaTable.objects.filter(id=pizzaId).delete()
    responseData['message'] = 'Success'
    return JsonResponse(responseData)

# @csrf_protect
# @csrf_exempt
@api_view(['POST'])
def editPizzaData(request):
    responseData = {}
    pizzaId = request.data['id']
    # pizzaType = request.POST.get('type')
    # pizzaSize = request.POST.get('size')
    # pizzaToppings = request.POST.get('toppings')
    pizzaData = PizzaTable.objects.get(id=pizzaId)
    serializer = PizzaTableSerializers(instance=pizzaData, data=request.data)
    if serializer.is_valid():
        serializer.save()

    # for ob in data:
    #     ob.type = pizzaType
    #     ob.size = pizzaSize
    #     ob.toppings = pizzaToppings
    #     ob.save()

    responseData['message'] = 'Success'
    return JsonResponse(responseData)

'''
# user authentication.
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login

def index(request):
    return render(request, 'user_example/index.html')

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)

        if form.is_valid():
            form.save()
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            user = authenticate(username=username, password=password)
            login(request, user)
            return redirect('index')
    else:
        form = UserCreationForm()

    context = {'form' : form}
    return render(request, 'registration/register.html', context)


'''

