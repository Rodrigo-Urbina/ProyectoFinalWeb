// Global Variables
var loggedInUser = 0;
var users = [];
var inversiones = [];
var fecha = today();

var tab = {
  value: 0
};

$(document).ready(function() {
  init(users);
  initInversiones(inversiones);
  setUser(0);
  setDate();
  fillUserTable(users);
  fillInvestmentTable(inversiones);

  $('.sidenav').sidenav();
  $('select').formSelect();

  $('.datepicker').datepicker();

  $('#addUser').on('click', function() {
    addUsers(users);
    fillUserTable(users);

  })

  $('#addInversion').on('click', function() {
    addInversion(inversiones);
    fillInvestmentTable(inversiones);
  })

  $('#iniciarSesion').on('click', function() {
    changeUser();
    fillIndividualUserTable();
    fillIndividualInvestmentTable();
  })

  $('#cambiarFecha').on('click', function() {
    cambiarFecha();
    fillIndividualUserTable();
    fillIndividualInvestmentTable();
  })

  $('#tab0').on('click', function() {
    tabCero(tab);
    $("#tab-0").show();
    $("#tab-1").hide();
    $("#tab-2").hide();
    $("#tab-3").hide();
  })
  $('#tab1').on('click', function() {
    tabUno(tab);
    $("#tab-0").hide();
    $("#tab-1").show();
    $("#tab-2").hide();
    $("#tab-3").hide();
  })
  $('#tab2').on('click', function() {
    tabDos(tab);
    $("#tab-0").hide();
    $("#tab-1").hide();
    $("#tab-2").show();
    $("#tab-3").hide();
  })
  $('#tab3').on('click', function() {
    tabDos(tab);
    $("#tab-0").hide();
    $("#tab-1").hide();
    $("#tab-2").hide();
    $("#tab-3").show();
  })
  $('#tab6').on('click', function() {
    closeSession();
    tabCero(tab);
    $("#tab-0").show();
    $("#tab-1").hide();
    $("#tab-2").hide();
    $("#tab-3").hide();
  })
});

function init(users) {
  users[users.length] = [
    {
      id: 0,
      nombre: "Visitante",
      contra: "",
      rol: "Visitante",
    }
  ];
  users[users.length] = [
    {
      id: 1,
      nombre: "Administrador",
      contra: 'admin',
      rol: "Administrador",
    }
  ];
  users[users.length] = [
    {
      id: 2,
      nombre: "Promotor",
      contra: 'promo',
      rol: "Promotor",
      ganancias: 0,
    }
  ];
  users[users.length] = [
    {
      id: 3,
      nombre: "Alban",
      contra: 'clien3',
      saldo: 1000,
      rol: "Cliente",
      ganancias: 0,
      registro: fecha
    }
  ];
  users[users.length] = [
    {
      id: 4,
      nombre: "Miriam",
      contra: 'clien4',
      saldo: 2000,
      rol: "Cliente",
      ganancias: 0,
      registro: fecha
    }
  ];
}

function initInversiones(inversiones) {
  inversiones[inversiones.length] = [
    {
      id: 2,
      fecha: today(),
      userId: '3',
      duracion: 120,
      inversion: 500,
      porcentaje: 8,
      tipo: 'Cete',
      ganancia: 13.3,//(inversion * porcentaje * 0.01 * duracion) / 360,
      comision: 1.3,//ganancia * 0.1
      gananciaReal: 12

    }
  ];
  inversiones[inversiones.length] = [
    {
      id: 3,
      fecha: today(),
      userId: '4',
      duracion: 250,
      inversion: 1500,
      porcentaje: 7,
      tipo: 'Cete',
      ganancia: 72.9,//(inversion * porcentaje * 0.01 * duracion) / 360,
      comision: 7.3,//ganancia * 0.1
      gananciaReal: 65.6
    }
  ];
  inversiones[inversiones.length] = [
    {
      id: 4,
      fecha: today(),
      userId: '4',
      duracion: 420,
      inversion: 100,
      porcentaje: 10,
      tipo: 'Cete',
      ganancia: 11.6,//(inversion * porcentaje * 0.01 * duracion) / 360,
      comision: 1.2,//ganancia * 0.1
      gananciaReal: 10.4
    }
  ];
}

function today() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth(); //January is 0!
  var yyyy = today.getFullYear();

  mm++;

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  today = mm + '/' + dd + '/' + yyyy;
  return today;
}

function closeSession() {
  let closeID = 0;
  setUser(closeID);
}

function changeUser() {
  let changeID = parseInt($('#formID').val());
  let changePass = $('#formPass').val();
  let found = false;
  let passRight = false;
  foundIndex = -1;

  $.each(users, function(index, value) {
    if (changeID === value[0].id) {
      found = true;
      foundIndex = index;
      return true;
    }
  })

  $.each(users, function(index, value) {
    if (changePass == value[0].contra) {
      passRight = true;
      return true;
    }
  })

  $('#formID').val('');
  $('#formPass').val('');

  if (found == true && passRight == true) {
    setUser(foundIndex);
  } else {
    window.alert('Usuario No Encontrado');
  }

}

function setUser(index) {
  let setUserID = users[index][0].id;
  let setUserName = users[index][0].nombre;
  loggedInUser = setUserID;

  $('#tab0').html('<a href="#">' + loggedInUser + ' - ' + setUserName + '</a>');

  let rol = users[index][0].rol;

  if (rol === 'Cliente') {
    $("#tab1").hide();
    $("#tab2").hide();

    $("#userTable1").show();
    $("#userTable2").show();
    $("#user-depositar-retirar").show();
  } else if (rol === 'Visitante') {
    $("#tab1").hide();
    $("#tab2").hide();

    $("#userTable1").hide();
    $("#userTable2").hide();
    $("#user-depositar-retirar").hide();

  } else {
    $("#tab1").show();
    $("#tab2").show();

    $("#userTable1").hide();
    $("#userTable2").hide();
    $("#user-depositar-retirar").hide();
  }

  if (rol === 'Promotor') {
    $("#agregarClienteForm").show();
    $("#agregarInversionForm").show();

  } else {
    $("#agregarClienteForm").hide();
  }

  if (rol === 'Administrador') {
    $("#agregarInversionForm").hide();
  } else {}

}

function setDate() {
  $('#tab3').html('<a href="#">' + fecha + '</a>');
}
function getDate() {
  return fecha;
}

function fillUserTable(users) {
  var tableBody = '';

  $.each(users, function(index, value) {
    var invertido = 0;
    if (fecha >= value[0].registro && value[0].rol === 'Cliente') {
      $.each(inversiones, function(index, value2) {
        if(value[0].id == value2[0].userId) {
          invertido += value2[0].inversion;
          value[0].ganancias += value2[0].gananciaReal;
        }
      })
      tableBody += '<tr><td>' + value[0].id + '</td><td>' + value[0].nombre + '</td>><td>' + value[0].rol + '</td><td>' + value[0].registro + '</td><td>' + value[0].saldo + '</td>><td>' + (value[0].saldo - invertido) + '</td>><td>' + invertido + '</td>><td>' + value[0].ganancias + '</td></tr>';
    }
  })

  $('#userTableRows').html(tableBody);
}

function fillIndividualUserTable() {
  var tableBody = '';

  $.each(users, function(index, value) {
    var invertido = 0;
    if (fecha >= value[0].registro && value[0].id === loggedInUser) {
      $.each(inversiones, function(index, value2) {
        if(value[0].id == value2[0].userId) {
          invertido += value2[0].inversion;
          value[0].ganancias += value2[0].gananciaReal;
        }
      })
      tableBody += '<tr><td>' + value[0].id + '</td><td>' + value[0].nombre + '</td>><td>' + value[0].rol + '</td><td>' + value[0].registro + '</td><td>' + value[0].saldo + '</td>><td>' + (value[0].saldo - invertido) + '</td>><td>' + invertido + '</td>><td>' + value[0].ganancias + '</td></tr>';
    }
  })

  $('#individualUser').html(tableBody);
}

function fillInvestmentTable(inversiones) {
  var inversionesRows = '';

  $.each(inversiones, function(index, value) {
    let name = "";
    $.each(users, function(index, value2) {
      if(value[0].userId == value2[0].id) {
        name = value2[0].nombre;
      }
    })

    inversionesRows += '<tr><td>' + value[0].userId + '</td><td>' + name + '</td><td>' + '2' + '</td><td>' + value[0].fecha + '</td>><td>' + value[0].inversion + '</td><td>' + value[0].porcentaje + '</td><td>' + value[0].tipo + '</td><td>' + value[0].duracion + /*'</td><td>' + dayDifference + '</td><td>' + '-' +*/ '</td><td>' + value[0].ganancia + '</td>><td>' + value[0].comision + '</td></tr>';
  })

  $('#tablaInversiones').html(inversionesRows);
}

function fillIndividualInvestmentTable() {
  var inversionesRows = '';

  $.each(inversiones, function(index, value) {
    if (fecha >= value[0].fecha && value[0].userId == loggedInUser) {
      let name = "";
      $.each(users, function(index, value2) {
        if(value[0].userId == value2[0].id) {
          name = value2[0].nombre;
        }
      })
        inversionesRows += '<tr><td>' + value[0].userId + '</td><td>' + name + '</td><td>' + '2' + '</td><td>' + value[0].fecha + '</td>><td>' + value[0].inversion + '</td><td>' + value[0].porcentaje + '</td><td>' + value[0].tipo + '</td><td>' + value[0].duracion + /*'</td><td>' + '-' + '</td><td>' + '-' +*/ '</td>></tr>';
    }
  })

  $('#individualUser2').html(inversionesRows);
}

function tabCero(tab) {
  tab.value = 0;
}

function tabUno(tab) {
  tab.value = 1;
}

function tabDos(tab) {
  tab.value = 2;
}

function addUsers(users) {
  var id = users.length;
  let nombre = $('#nombre').val();
  let saldo = $('#saldoInicial').val();
  let pass = "clien";

  users[users.length] = [
    {
      id: id,
      nombre: nombre,
      contra: pass.concat(id),
      saldo: saldo,
      rol: "Cliente",
      ganancias: 0,
      registro: fecha
    }
  ]

  $('#nombre').val('');
  $('#saldoInicial').val('');
}

function addInversion(inversiones) {
  let id = Date.now();

  let userId = $('#userId').val();
  let dias = $('#dias').val();
  let inversion = $('#inversion').val();
  let porcentaje = ($('#porcentaje').val());
  let tipo = $('#tipoSelect').val();

  var porcentajeDecimal = porcentaje/100
  var ganancia =  ( 1+ (parseFloat(porcentajeDecimal)/365 ) )

var tiempo = 365* parseFloat(dias/365);

  ganancia = Math.pow(ganancia, tiempo);

  ganancia = parseFloat(inversion)* ganancia;





  ganancia = ganancia - parseFloat(inversion)
  ganancia = ganancia.toFixed(2);
  var comision = ganancia*.10
  comision = comision.toFixed(2);


  inversiones[inversiones.length] = [
    {
      id: id,
      fecha: fecha,
      userId: userId,
      duracion: dias,
      inversion: inversion,
      porcentaje: porcentaje,
      tipo: tipo,
      ganancia:ganancia,
      comision:comision
    }
  ]

  $('#userId').val('');
  $('#dias').val('');
  $('#inversion').val('');
  $('#porcentaje').val('');
}

function getUserById(users, id) {
  if (id <= users.length) {
    return users[id - 1];
  } else {
    return false;
  }
}

function cambiarFecha() {
  auxFecha = $('.datepicker').val();

  if (auxFecha !== '') {
    dd = auxFecha[4] + auxFecha[5];
    mm = auxFecha[0] + auxFecha[1] + auxFecha[2];
    yyyy = auxFecha[8] + auxFecha[9] + auxFecha[10] + auxFecha[11]

    switch (mm) {
      case 'Jan':
        mm = '01'
        break;
      case 'Feb':
        mm = '02'
        break;
      case 'Mar':
        mm = '03'
        break;
      case 'Apr':
        mm = '04'
        break;
      case 'May':
        mm = '05'
        break;
      case 'Jan':
        mm = '06'
        break;
      case 'Jul':
        mm = '07'
        break;
      case 'Aug':
        mm = '08'
        break;
      case 'Sep':
        mm = '09'
        break;
      case 'Oct':
        mm = '10'
        break;
      case 'Nov':
        mm = '11'
        break;
      case 'Dec':
        mm = '12'
        break;
      default:
        mm = 'error'
    }

    fecha = mm + '/' + dd + '/' + yyyy;

    setDate();
    $('.datepicker').val('');
    fillUserTable(users);
    fillInvestmentTable(inversiones);
  }
}
