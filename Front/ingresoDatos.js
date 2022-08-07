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
            }
            // error: function (xhr, status) {
            //     alert("No se pudo agregar al estudiante")
            // }
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
            }
            // error: function (jqXHR, textStatus, errorThrown) {
            //     alert("No se pudo agregar el curso")
            // }
        });
    }
}
function agregarMatricula() {
    $("#tablaCursos").hide();
    $("#tablaEstudiantes").hide();
    $("#aggEstudiante").hide();
    $("#aggCurso").hide();
    $("#aggMatricula").show();

    let estudiante = $("#estudiante").val();
    let curso = $("#curso").val();
    let notaUno = $("#notaUno").val();
    //let notaDos = $("#notaDos").val();
    //let notaDos = $("#notaDos").val();

    let notaFinal = (notaUno + notaDos + notaTres)/3;

    var data = {
        estudiante:estudiante,
        curso:curso,
        notas:{notaUno,notaDos,notaDos},
        notaFinal:notaFinal
    };

    $.ajax({
        url: url+"/matriculas/agregar",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (response) {
            limpiar();
            alert("Curso agregado")
            $("#aggCurso").show();
        }
        // error: function (jqXHR, textStatus, errorThrown) {
        //     alert("No se pudo agregar el curso")
        // }
    });
}

function limpiar(){
    $("#nombres").val("");
    $("#apellidos").val("");
    $("#codigo").val("");
}