
class PizzaHandler {
    constructor() {
        var pizzaType = 'Regular';
        var pizzaData = [];
        var pizzaSize = 'Small';
        var pizzaToppings = 'None';
        var filterPizzaSize = 'None';
        var filterPizzaType = 'None';
        var pizzaTypeDD = $('#pizzaTypeDD');
        var filterPizzaTypeDD = $('#filterPizzaTypeDD');
        var filterPizzaSizeDD = $('#filterPizzaSizeDD');
        var pizzaSizeDD = $('#pizzaSizeDD');
        var toppingsDiv = $('#toppings');
        var updateButton = $('#updateButton');
        var cancelButton = $('#cancelButton');
        var pizzaItemTable = $('.ui.fixed.single.line.celled.table');
        fillTypeData(pizzaTypeDD);
        fillTypeDataFilter(filterPizzaTypeDD);
        fillSizeData(pizzaSizeDD);
        fillSizeDataFilter(filterPizzaSizeDD);
        createTable(pizzaItemTable);
        updateButton.unbind('click').bind('click',onApprove);

        function fillTypeData ($model) {
            $model.empty();
            $model.append('<option value="' + 'Regular_Type' + '">' + 'Regular' + '</option>');
            $model.append('<option value="' + 'Square_Type' + '">' + 'Square' + '</option>');
            $model.dropdown().dropdown({
                onChange: function (dsValue, text, $dsElement) {
                    console.log("inside on change function");
                    pizzaType = text;
                }
            })
        };

        function fillTypeDataFilter ($model) {
            $model.empty();
            $model.append('<option value="' + 'None_Type' + '">' + 'None' + '</option>');
            $model.append('<option value="' + 'Regular_Type' + '">' + 'Regular' + '</option>');
            $model.append('<option value="' + 'Square_Type' + '">' + 'Square' + '</option>');
            $model.dropdown().dropdown({
                onChange: function (dsValue, text, $dsElement) {
                    console.log("inside on change function");
                    filterPizzaType = text;
                    updateTable();
                }
            })
        };

        function fillSizeData ($model) {
            $model.empty();
            $model.append('<option value="' + 'Small_Size' + '">' + 'Small' + '</option>');
            $model.append('<option value="' + 'Medium_Size' + '">' + 'Medium' + '</option>');
            $model.append('<option value="' + 'Large_Size' + '">' + 'Large' + '</option>');
            $model.append('<option value="' + 'Extra_Large_Size' + '">' + 'Extra Large' + '</option>');
            $model.append('<option value="' + 'Family_Size' + '">' + 'Family Pack' + '</option>');
            $model.dropdown().dropdown({
                onChange: function (dsValue, text, $dsElement) {
                    console.log("inside on change function");
                    pizzaSize = text;
                }
            })
        };

        function fillSizeDataFilter ($model) {
            $model.empty();
            $model.append('<option value="' + 'None_Type' + '">' + 'None' + '</option>');
            $model.append('<option value="' + 'Small_Size' + '">' + 'Small' + '</option>');
            $model.append('<option value="' + 'Medium_Size' + '">' + 'Medium' + '</option>');
            $model.append('<option value="' + 'Large_Size' + '">' + 'Large' + '</option>');
            $model.append('<option value="' + 'Extra_Large_Size' + '">' + 'Extra Large' + '</option>');
            $model.append('<option value="' + 'Family_Size' + '">' + 'Family Pack' + '</option>');
            $model.dropdown().dropdown({
                onChange: function (dsValue, text, $dsElement) {
                    console.log("inside on change function");
                    filterPizzaSize = text;
                    updateTable();
                }
            })
        }

        function updateTable() {
            createTable(pizzaItemTable);
        }

        function createTable (pizzaItemTable) {
            getPizzaInfo();
            debugger;
            pizzaItemTable.empty();
            pizzaItemTable.append('<thead>\n' +
                '                    <tr><th>Type</th>\n' +
                '                        <th>Size</th>\n' +
                '                        <th colspan="2" >Toppings</th>\n' +
                '                        <th>Actions</th>\n' +
                '                    </tr></thead>');

            for (var i = 0; i < pizzaData.length; i++) {
                var info = pizzaData[i];
                var id = info.Id;
                var Type = info.Type;
                var Size = info.Size;
                var Toppings = info.Toppings;
                pizzaItemTable.append('<tr id="' + id + '">\n' +
                    '                        <td data-label="Name" id="Type' + id + '" data-content="' + Type + '"><label> ' + Type + ' </label></td>\n' +
                    '                        <td data-label="Size"><div style="">  <input id="Size' + id + '" style="outline: none; border: none" type="text" placeholder="Size"> </div></td>\n' +
                    '                        <td colspan="2" data-label="Toppings"><div style="">  <input id="Toppings' + id + '" style="outline: none; border: none" type="text" placeholder="Toppings"> </div></td>\n' +
                    '                        <td data-label="Actions"><div class="addUDTooltip" style="alignment: center; font-weight: normal;min-width: 41px;margin-left: 30px;margin-top: -7px;">\n' +
                    '                            <img class="trash upload dict" id="trash' + id + '"  src="'+ GLOBAL_PATH +'/images/delete.svg" cardid="bd4b348c-9be0-4e92-8942-1f2740045fc5" data-content="Delete" style="alignment: center; width: 13px;height:13px;margin: 8.5px 12px 0px 0px;">\n' +
                    '                            <img class="edit upload dict" id="edit' + id + '"  cardid="bd4b348c-9be0-4e92-8942-1f2740045fc5" src="'+GLOBAL_PATH +'/images/openineditor.svg" data-content="Edit" style="alignment: center; width: 11.5px;height:13px;margin: 8.5px 12px 0px 0px;">\n' +
                    '                            <input type="file" id="fileEditDict" data-parsley-required-message="" style="display:none;" fileEditDict  data-parsley-trigger="change" data-parsley-trigger-after-failure="change" accept=".csv"> '+
                    '                        </div></td>\n' +
                    '                    </tr>'
                );
                $('#Size' + id).val(Size);
                $('#Toppings' + id).val(Toppings);
                $('#trash'+ id ).unbind('click').bind('click', onDelete);
                $('#edit'+ id).unbind('click').bind('click', onEdit);
            }
        }

        function onDelete (event) {
            console.log('inside delete fun');
            /*var dictId = $(event.target).attr('id').split("trash")[1];
            var dictName = getDictName(dictId);
            deleteDict(dictId, dictName);
            var modelNameToBeDeleted = $(this).closest('tr').attr('id');
            $("#" + modelNameToBeDeleted).remove();*/
        }

        function onEdit (event) {
            console.log('inside edit fun');
            /*var dictId = $(event.target).attr('id').split("edit")[1];
            var datasetPath = getFilePath(dictId);
            $BrowseEdit = modal.getElement("#fileEditDict");
            $BrowseEdit.click();
            $BrowseEdit.on('change', function () {
                var editFormData = new FormData();
                var fileName = $BrowseEdit[0].files[0].name;
                var data = $BrowseEdit[0].files[0];
                editFormData.append("dictId", dictId);
                editFormData.append("DictFile", data);
                editFormData.append("fileName", fileName);
                editFormData.append("datasetPath", datasetPath);
                updateCsv(editFormData);
                $BrowseEdit.empty();
            });*/
        }

        function deletePizzaData (dictId, dictName) {
            /*var data = {
                requestType: "deleteDict",
                dictId: dictId,
                dictName: dictName
            };
            var dmxAjax = new DMXAjax();
            dmxAjax.fireAjax({
                type: "POST",
                data: data,
                async: false,
                url: DIContext.context + "/request/UploadDictionary/UploadDictionaryRequest",
                serverSuccess: function (response) {
                    DMXErrorBox.success(response.message);
                    deleteIdFromDictInfo(dictId);

                },
                serverError: function (response) {
                    DMXErrorBox.error(response.message);
                }
            })*/
        }

        this.getDictInfo = function () {
            /*var dmxAjax = new DMXAjax();
            dmxAjax.fireAjax({
                type: "POST",
                data: {requestType: "getDictInfo"},
                async: false,
                url: DIContext.context + "/request/UploadDictionary/UploadDictionaryRequest",
                serverSuccess: function (response) {
                    dictInfo = [];
                    dictInfo = response.data;
                },
                serverError: function (response) {
                    DMXErrorBox.error(response.message);
                },
                loading: function () {
                    $('body').append($('<div class="ui active inverted dimmer diBodyLoader"><div class="ui text loader">Loading</div></div>'));
                    // DMXRequest.addLoaderToDivNoCheck($('body'))
                },
                unloading: function () {
                    $('body').find('.inverted.dimmer:not(.ignoreDimmer)').remove();
                }

            })*/
        };

        this.onCancel = function () {
            //modal.hide();
        };

        function onApprove() {
            var toppingVal = toppingsDiv.val();
            if (toppingVal !== undefined) {
                pizzaToppings = toppingVal;
            }
            savePizzaInfo();
        }

        function savePizzaInfo() {
            $.ajax({
                type: 'POST',
                url: '/pizza/save',
                data:{
                    Type: pizzaType,
                    Size: pizzaSize,
                    Toppings: pizzaToppings,
                },
                success: function (response) {
                    var message = response.message;
                    console.log(message);
                }
            });
        }

        function getPizzaInfo() {
            $.ajax({
                type: 'POST',
                url: '/pizza/getData',
                data:{
                    Type: filterPizzaType,
                    Size: filterPizzaSize,
                },
                async: false,
                success: function (response) {
                    pizzaData = response.data;
                    var message = response.message;
                    console.log(message);
                }
            });
        }
    }
}



$(document).ready(function () {
    new PizzaHandler();
});





//########################################################################
/*var sentimentVar = '';

var Analyze = $("#SAAnalyze");
Analyze.on("click", function () {
    sentimentVar = $('#text_area').val();
    //loadPage('index.html') //--> will get back to it later..
    //this is for vivken sentiment only... as we add more diversity we will
    //call different method accordingly
    getViveknSentiment();
});*/


function getViveknSentiment() {
    document.getElementById('sentimentResultDisplay').value = "";
    $.ajax({
        type: 'POST',
        url: '/sentimentResult/viveknSentiment',
        data:{
            sentimentText: sentimentVar
        },
        success: function (response) {
            var result = response.sentiment_value;
            var message = response.message;
            document.getElementById('sentimentResultDisplay').value = result;
        }
    });

}



//this method is not used for now but we will think of extending and making some
//great use of this method too....
function loadPage(path) {
    var response = null;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", path, false);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                response = xhr.responseText;
            } else {
                console.error(xhr.statusText)
            }
        }
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send();
    return response;
}