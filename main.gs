function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('Dialog')
      .addItem('Open', 'openDialog')
      .addToUi();
}

function openDialog() {
  var html = HtmlService.createHtmlOutputFromFile('index')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi()
      .showModalDialog(html, 'Simple Mapper');
}

function getData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  var values = sheet.getDataRange().getValues();
  
  titles = getColumn("Title", values);
  locations = getColumn("Location", values);
  
  data = [["Locations", "Title"]];
  
  for (i = 0; i < values.length - 1; i++) {
    data.push([locations[i], titles[i]]);
  }
  
  Logger.log(data);
  return data;
}

function indexOfNamedColumn(name, names) { 
  for (i = 0; i < names.length; i++) {
    if (name == names[i]) {
      return i;
    }
  }
}

function getColumn(name, values) {
  index = indexOfNamedColumn(name, values[0]);
  column = [];
  
  for (i = 1; i < values.length; i++) {
    column.push(values[i][index]);
  }
  
  return column;
}