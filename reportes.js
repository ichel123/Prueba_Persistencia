function verEstudiantes(){
    var url = "http://localhost:3000";
    $(document).ready(function () {
    $.getJSON(url+"/estudiantes", function (data) {
        var estudiante = '';
        $.each(data, function (key, value) {
            estudiante += '<tr>';
            estudiante += '<td>' +value.id + '</td>';
            estudiante += '<td>' +value.nombres + '</td>';
            estudiante += '<td>' + value.apellidos + '</td>';
            estudiante += '<td>' +value.codigo + '</td>';
            estudiante += '</tr>';
        });
        $('#table').append(estudiante);
    });
  });
}

function verCursos(){
    var url = "http://localhost:3000";
    $(document).ready(function () {
    $.getJSON(url+"/cursos", function (data) {
        var cursos = '';
        $.each(data, function (key, value) {
            cursos += '<tr>';
            cursos += '<td>' +value.id + '</td>';
            cursos += '<td>' +value.nombre + '</td>';
            cursos += '<td>' +value.tipo + '</td>';
            cursos += '<td>' +value.creditos + '</td>';
            cursos += '</tr>';
        });
        $('#table').append(cursos);
    });
  });
}