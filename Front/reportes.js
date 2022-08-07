var url = "http://localhost:3000";

function verEstudiantes(){
    $("#tablaCursos").hide();
    $("#aggEstudiante").hide();
    $("#aggCurso").hide();
    $("#tablaMatriculas").hide();
    $("#tablaEstudiantes").show();
    $(document).ready(function () {
    $.getJSON(url+"/estudiantes", function (data) {
        $('#cuerpoTablaEstudiantes').empty();
        $.each(data, function (key, value) {
            $('#cuerpoTablaEstudiantes').append(
                '<tr>'+
                    '<td>' +value.nombres + '</td>'+
                    '<td>' +value.apellidos + '</td>'+
                    '<td>' +value.codigo + '</td>'+
                '</tr>'
            ); 
        });
    });
  });
}
function verRegistroEstud(){
    $("#tablaCursos").hide();
    $("#tablaEstudiantes").hide();
    $("#aggCurso").hide();
    $("#tablaMatriculas").hide();
    $("#aggMatricula").hide();
    $("#aggEstudiante").show();
}
function verRegistroCurso(){
    $("#tablaCursos").hide();
    $("#tablaEstudiantes").hide();
    $("#aggEstudiante").hide();
    $("#tablaMatriculas").hide();
    $("#aggMatricula").hide();
    $("#aggCurso").show();
}
function verRegistroMatricula(){
    $("#tablaCursos").hide();
    $("#tablaEstudiantes").hide();
    $("#aggEstudiante").hide();
    $("#tablaMatriculas").hide();
    $("#aggCurso").hide();
    $("#aggMatricula").show();
    selectEstudiantes();
    selectCursos();
}
function verCursos(){
    $("#tablaEstudiantes").hide();
    $("#aggEstudiante").hide();
    $("#tablaMatriculas").hide();
    $("#aggMatricula").hide();
    $("#aggCurso").hide();
    $("#tablaCursos").show();
    $(document).ready(function () {
    $.getJSON(url+"/cursos", function (data) {
        $('#cuerpoTablaCursos').empty();
        $.each(data, function (key, value) {
            $('#cuerpoTablaCursos').append(
                '<tr>'+
                    '<td>' +value.nombre + '</td>'+
                    '<td>' +value.tipo + '</td>'+
                    '<td>' +value.creditos + '</td>'+
                '</tr>'
            ); 
        });
    });
  });
}
function verMatriculas(){
    $("#tablaCursos").hide();
    $("#tablaEstudiantes").hide();
    $("#aggEstudiante").hide();
    $("#aggMatricula").hide();
    $("#aggCurso").hide();
    $("#tablaMatriculas").show();
    $(document).ready(function () {
    $.getJSON(url+"/matriculas", function (data) {
        $('#cuerpoTablaMatriculas').empty();
        $.each(data, function (key, value) {
            $('#cuerpoTablaMatriculas').append(
                '<tr>'+
                    '<td>' +value.estudiante + '</td>'+
                    '<td>' +value.curso + '</td>'+
                    '<td>' +value.notas + '</td>'+
                    '<td>' +value.notaFinal + '</td>'+
                '</tr>'
            ); 
        });
    });
  });
}
function selectEstudiantes(){
    let listaSelect = $('#listaEstudiantes');
    listaSelect.empty();
    listaSelect.append('<option selected = "true">Elija estudiante</option>');
    listaSelect.prop('selectedIndex', 0);

    $.getJSON(url+"/estudiantes", function (data) {
        $.each(data, function (key, value) {
            listaSelect.append($('<option></option>').attr('value', value.codigo).text(value.nombres)); 
        });
    });
}
function selectCursos(){
    let listaSelect = $('#listaCursos');
    listaSelect.empty();
    listaSelect.append('<option selected = "true">Elija curso</option>');
    listaSelect.prop('selectedIndex', 0);

    $.getJSON(url+"/cursos", function (data) {
        $.each(data, function (key, value) {
            listaSelect.append($('<option></option>').attr('value', value.nombre).text(value.nombre)); 
        });
    });
}
