from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.http import JsonResponse
from .models import PizzaTable

def getHomePage(request):
    return render(request, 'PizzaHomePage.html')

@csrf_protect
@csrf_exempt
def savePizzaData(request):
    responseData = {}
    pizzaType = request.POST.get("Type")
    pizzaSize = request.POST.get("Size")
    pizzaToppings = request.POST.get("Toppings")
    try:
        dbState = PizzaTable(type=pizzaType, size=pizzaSize, toppings=pizzaToppings)
        dbState.save()
        responseData['message'] = 'Success'
    except Exception as e:
        print('exception is : ' + e)
        responseData['message'] = str(e)

    return JsonResponse(responseData)

@csrf_protect
@csrf_exempt
def getPizzaData(request):
    filterPizzaType = request.POST.get('Type')
    filterPizzaSize = request.POST.get('Size')
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
    try:
        if (len(query) != 0):
            data = PizzaTable.objects.raw("select * from pizza_pizzatable " + query)
        else:
            data = PizzaTable.objects.raw("select * from pizza_pizzatable")
        dataList = makeDBData(data)
        responseData['data'] = dataList
        responseData['message'] = 'Success'
    except Exception as e:
        print('exception is : ' + e)
        responseData['message'] = str(e)
    return JsonResponse(responseData)

def makeDBData(data):
    dataList = []
    for val in range(data.__len__()):
        dataDict = {}
        dataDict['Id'] = data[val].id
        dataDict['Type'] = data[val].type
        dataDict['Size'] = data[val].size
        dataDict['Toppings'] = data[val].toppings
        dataList.append(dataDict)
    return dataList

@csrf_protect
@csrf_exempt
def deletePizzaData(request):
    responseData = {}
    pizzaId = request.POST.get("Id")
    try:
        PizzaTable.objects.filter(id=pizzaId).delete()
        responseData['message'] = 'Success'
    except Exception as e:
        print('exception is : ' + e)
        responseData['message'] = str(e)
    return JsonResponse(responseData)

@csrf_protect
@csrf_exempt
def editPizzaData(request):
    responseData = {}
    pizzaId = request.POST.get('Id')
    pizzaType = request.POST.get('Type')
    pizzaSize = request.POST.get('Size')
    pizzaToppings = request.POST.get('Toppings')

    try:
        data = PizzaTable.objects.filter(id=pizzaId)
        for ob in data:
            ob.type = pizzaType
            ob.size = pizzaSize
            ob.toppings = pizzaToppings
            ob.save()
        responseData['message'] = 'Success'
    except Exception as e:
        print('exception is : ' + e)
        responseData['message'] = str(e)
    return JsonResponse(responseData)

