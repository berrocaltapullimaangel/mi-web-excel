// Servir la página web (Index.html)
function doGet() {
  return HtmlService.createTemplateFromFile('Index')
      .evaluate()
      .setTitle('Sistema de Gestión Logística')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// Obtener datos del inventario (Basado en la estructura de tu imagen)
function getInventoryData() {
  // Asegúrate de cambiar 'Inventario' por el nombre real de tu pestaña
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Inventario"); 
  if(!sheet) return [];
  
  const data = sheet.getDataRange().getDisplayValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  // Transformar a un array de objetos para que sea fácil de manejar en JS
  return rows.map(row => {
    let obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });
}

// Función simulada para registrar usuario (Requeriría una pestaña 'Usuarios')
function registerUser(username, password) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Usuarios");
  
  if (!sheet) {
    sheet = ss.insertSheet("Usuarios");
    sheet.appendRow(["Usuario", "Contraseña", "Rol"]);
  }
  
  sheet.appendRow([username, password, "Operador"]);
  return { success: true, message: "Registro exitoso." };
}

// Función simulada para login
function loginUser(username, password) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Usuarios");
  if(!sheet) return { success: false, message: "No hay usuarios registrados." };
  
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === username && data[i][1] === password) {
      return { success: true, message: "Acceso concedido." };
    }
  }
  return { success: false, message: "Credenciales incorrectas." };
}