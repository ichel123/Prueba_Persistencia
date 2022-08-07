var url = "http://localhost:3000";

function agregarEstudiante(){
    if($("#nombres").val()=="" || $("#apellidos").val()=="" || $("#codigo").val()==""){
        alert("Todos los campos son obligatorios");
    }
    else{
        let nombres = $("#nombres").val();
        let apellidos = $("#apellidos").val();
        let codigo = $("#codigo").val();

        var data = {
            nombres:nombres,
            apellidos:apellidos,
            codigo:codigo
        };

        $.ajax({
            url: url+"/estudiantes/agregar",
            type: "POST",
            dataType: "json",
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (response) {
                //limpiar();
                alert("Estudiante agregado")
            },
            error: function (xhr, status) {
                alert("No se pudo agregar al estudiante")
            }
        });
    }
}
function agregarCurso(){
    $("#tablaCursos").hide();
    $("#tablaEstudiantes").hide();
    $("#aggEstudiante").hide();
    $("#aggCurso").show();
    if($("#nombre").val()==""){
        alert("Todos los campos son obligatorios");
    }
    else{
        let nombre = $("#nombre").val();
        let tipo = $("#tipoCurso").val();
        let creditos = $("#creditos").val();

        var data = {
            nombre:nombre,
            tipo:tipo,
            creditos:creditos
        };

        $.ajax({
            url: url+"/cursos/agregar",
            type: "POST",
            dataType: "json",
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (response) {
                limpiar();
                alert("Curso agregado")
                $("#aggCurso").show();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se pudo agregar el curso")
            }
        });
    }
}
function limpiar(){
    $("#nombres").val("");
    $("#apellidos").val("");
    $("#codigo").val("");
}