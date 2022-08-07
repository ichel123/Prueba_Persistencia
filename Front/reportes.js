var url = "http://localhost:3000";

function verEstudiantes(){
    $("#tablaCursos").hide();
    $("#aggEstudiante").hide();
    $("#aggCurso").hide();
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
    $("#aggEstudiante").show();
}
function verRegistroCurso(){
    $("#tablaCursos").hide();
    $("#tablaEstudiantes").hide();
    $("#aggEstudiante").hide();
    $("#aggCurso").show();
}
function verCursos(){
    $("#tablaEstudiantes").hide();
    $("#aggEstudiante").hide();
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