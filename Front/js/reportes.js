var url = "http://localhost:3000";

function verEstudiantes(){
    $("#tablaCursos").hide();
    $("#aggEstudiante").hide();
    $("#aggCurso").hide();
    $("#tablaMatriculas").hide();
    $("#btnRegistroCurso").hide();
    $("#btnRegistroMat").hide();
    $("#aggMatricula").hide();
    $("#tablaEstudiantes").show();
    $("#btnRegistroEst").show();
    $(document).ready(function () {
    $.getJSON(url+"/estudiantes", function (data) {
        $('#cuerpoTablaEstudiantes').empty();
        $.each(data, function (key, value) {
            $('#cuerpoTablaEstudiantes').append(
                '<tr>'+
                    '<td>' +value.nombres + '</td>'+
                    '<td>' +value.apellidos + '</td>'+
                    '<td>' +value.codigo + '</td>'+
                    '<td>'+'<button type="button" class="btn btn-secondary" onclick=editarEstudiante('+value.nombres+','+value.apellidos+','+value.codigo+')>Editar</button>'+
                    '<button type="button" class="btn btn-danger" style="margin-left: 5px;" onclick=eliminarEstudiante('+value.codigo+')>Eliminar</button>'+'</td>'+
                '</tr>'
            ); 
        });
    });
  });
}

function verCursos(){
    $("#btnRegistroEst").hide();
    $("#tablaEstudiantes").hide();
    $("#aggEstudiante").hide();
    $("#tablaMatriculas").hide();
    $("#aggMatricula").hide();
    $("#aggCurso").hide();
    $("#btnRegistroMat").hide();
    $("#tablaCursos").show();
    $("#btnRegistroCurso").show();
    $(document).ready(function () {
    $.getJSON(url+"/cursos", function (data) {
        $('#cuerpoTablaCursos').empty();
        $.each(data, function (key, value) {
            $('#cuerpoTablaCursos').append(
                '<tr>'+
                    '<td>' +value.nombre + '</td>'+
                    '<td>' +value.tipo + '</td>'+
                    '<td>' +value.creditos + '</td>'+
                    '<td>'+'<button type="button" class="btn btn-secondary" onclick=editar('+value.nombre+','+value.tipo+','+value.creditos+')>Editar</button>'+
                    '<button type="button" class="btn btn-danger" style="margin-left: 5px;" onclick=eliminarCurso('+value.nombre+')>Eliminar</button>'+'</td>'+
                '</tr>'
            ); 
        });
    });
  });
}
function verMatriculas(){
    $("#btnRegistroCurso").hide();
    $("#btnRegistroEst").hide();
    $("#tablaCursos").hide();
    $("#tablaEstudiantes").hide();
    $("#aggEstudiante").hide();
    $("#aggMatricula").hide();
    $("#aggCurso").hide();
    $("#btnRegistroMat").show();
    $("#tablaMatriculas").show();
    $(document).ready(function () {
    $.getJSON(url+"/matriculas", function (data) {
        $('#cuerpoTablaMatriculas').empty();
        $.each(data, function (key,value) {
            $('#cuerpoTablaMatriculas').append(
                '<tr>'+
                    '<td>' +value.estudiante + '</td>'+
                    '<td>' +value.curso + '</td>'+
                    '<td>' +JSON.stringify(value.notas) + '</td>'+
                    '<td>' +value.notaFinal + '</td>'+
                    '<td>'+'<button type="button" class="btn btn-secondary" onclick=editar('+value.nombres+','+value.apellidos+','+value.codigo+')>Editar</button>'+
                    '<button type="button" class="btn btn-danger" style="margin-left: 5px;" onclick=eliminarMatricula('+value.codigo+')>Eliminar</button>'+'</td>'+
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
    $("#btnRegistroEst").hide();
    $("#aggEstudiante").show();
}
function verRegistroCurso(){
    $("#btnRegistroCurso").hide();
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
    $("#btnRegistroMat").hide();
    $("#aggMatricula").show();
    selectEstudiantes();
    selectCursos();

}
// Listas Desplegables
function selectEstudiantes(){
    let listaSelect = $('#listaEstudiantes');
    listaSelect.empty();
    listaSelect.append('<option selected = "true">Elija estudiante</option>');
    listaSelect.prop('selectedIndex', 0);

    $.getJSON(url+"/estudiantes", function (data) {
        $.each(data, function (key,value) {
            listaSelect.append($('<option></option>').attr('value',value.codigo).text(value.codigo)); 
        });
    });
}
function getCursoValue(nombre){
    var data = {
        nombre:nombre
    };
    
    $.ajax({
        url: url+"/cursos/consulta",
        type: "POST",
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (response) {
            console.log(data);
            console.log("hola response: " + JSON.stringify(response));

            let divNotas = $('#notas');
            console.log(response[0].tipo);

            if(response[0].tipo=="Teórico"){
                divNotas.empty();
                for(var i=0; i<3; i++){
                    divNotas.append('<label for="creditos">Nota '+(i+1)+''+':</label>'+
                    '<input step="0.1" type="number" id="nota'+(i+1)+'" name="notas" max="5" min="0" value="1">')
                }
            }
            else{
                divNotas.empty();
                for(var i=0; i<4; i++){
                    divNotas.append('<label for="creditos">Nota '+(i+1)+''+':</label>'+
                    '<input step="0.1" type="number" id="nota'+(i+1)+'" name="notas" max="5" min="0" value="1">')
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("No se pudo agregar el curso")
        }
    });
}
function selectCursos(){
    let listaSelect = $('#listaCursos');
    listaSelect.empty();
    listaSelect.append('<option selected = "true">Elija curso</option>');
    listaSelect.prop('selectedIndex', 0);
    
    $.getJSON(url+"/cursos", function (data) {
        $.each(data, function (key,value) {
            listaSelect.append($('<option></option>').attr('value', value.nombre).text(value.nombre)); 
        });
    });
    $(document).ready(function(){
        $('#listaCursos').change(function(){
            getCursoValue($(this).val());
        })
    })
}