//this class handles all the events related to homepage.
class PizzaHandler {
    constructor() {
        var editPizzaId = 'None';
        var isEdit = false;
        var pizzaType = 'Regular';
        var pizzaSize = 'Small';
        var pizzaToppings = 'Default';
        var pizzaData = [];
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
        cancelButton.unbind('click').bind('click',onCancel);

        function fillTypeData ($model) {
            $model.empty();
            pizzaType = 'Regular';
            $model.append('<option value="' + 'Regular_Type' + '">' + 'Regular' + '</option>');
            $model.append('<option value="' + 'Square_Type' + '">' + 'Square' + '</option>');
            $model.dropdown().dropdown({
                onChange: function (dsValue, text, $dsElement) {
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
                    filterPizzaType = text;
                    updateTable();
                }
            })
        }

        function fillSizeData ($model) {
            $model.empty();
            pizzaSize = 'Small';
            $model.append('<option value="' + 'Small_Size' + '">' + 'Small' + '</option>');
            $model.append('<option value="' + 'Medium_Size' + '">' + 'Medium' + '</option>');
            $model.append('<option value="' + 'Large_Size' + '">' + 'Large' + '</option>');
            $model.append('<option value="' + 'Extra_Large_Size' + '">' + 'Extra Large' + '</option>');
            $model.append('<option value="' + 'Family_Size' + '">' + 'Family Pack' + '</option>');
            $model.dropdown().dropdown({
                onChange: function (dsValue, text, $dsElement) {
                    pizzaSize = text;
                }
            })
        }

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
            var pizzaId = $(event.target).attr('id').split("trash")[1];
            deletePizzaData(pizzaId);
            var pizzaToDelete = $(this).closest('tr').attr('id');
            $("#" + pizzaToDelete).remove();
        }

        function onEdit (event) {
            var pizzaId = $(event.target).attr('id').split("edit")[1];
            var data = getPizzaDataFromMem(pizzaId);
            if (data.Id !== undefined) {
                var type = data.Type;
                var size = data.Size;
                var toppings = data.Toppings;
                pizzaTypeDD.dropdown('set selected', type);
                pizzaSizeDD.dropdown('set selected', size);
                toppingsDiv.val(toppings);
                isEdit = true;
                editPizzaId = data.Id;
            }
        }

        function getPizzaDataFromMem(pizzaId) {
            var data = {};
            for (var i = 0; i < pizzaData.length; i++) {
                var info = pizzaData[i];
                var id = info.Id;
                if (id.toString() === pizzaId) {
                    data = info;
                }
            }
            return data
        }

        function onCancel () {
            pizzaToppings = 'Default';
            fillTypeData(pizzaTypeDD);
            fillSizeData(pizzaSizeDD);
            toppingsDiv.val("");
            isEdit = false;
        }

        function onApprove() {
            var toppingVal = toppingsDiv.val();
            if (toppingVal !== undefined && toppingVal.length > 1) {
                pizzaToppings = toppingVal;
            }
            if (isEdit) {
                editPizzaInfo(editPizzaId);
            }else {
                savePizzaInfo();
            }
            isEdit = false;
            onCancel();
        }

        function deletePizzaData (pizzaId) {
            $.ajax({
                type: 'POST',
                url: '/pizza/delete',
                data:{
                    Id: pizzaId
                },
                async: false,
                success: function (response) {
                    var message = response.message;
                    if (message !== "Success") {
                        alert(message);
                    }
                },
            });
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
                    if (message !== "Success") {
                        alert(message);
                    }
                    updateTable();
                }
            });
        }

        function editPizzaInfo(editPizzaId) {
            $.ajax({
                type: 'POST',
                url: '/pizza/edit',
                data:{
                    Id: editPizzaId,
                    Type: pizzaType,
                    Size: pizzaSize,
                    Toppings: pizzaToppings,
                },
                success: function (response) {
                    var message = response.message;
                    if (message !== "Success") {
                        alert(message);
                    }
                    updateTable();
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
                    if (message !== "Success") {
                        alert(message);
                    }
                },
            });
        }
    }
}



$(document).ready(function () {
    new PizzaHandler();
});



