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
            url: url+"/estudiantes",
            type: "POST",
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (response) {
                alert("Estudiante agregado")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se pudo agregar el curso")
            }
        });
    }
}
function agregarCurso(){
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
            url: url+"/cursos",
            type: "POST",
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (response) {
                alert("Curso agregado")
                $("#aggCurso").show();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se pudo agregar el curso")
            }
        });
    }
}
function agregarMatricula() {

    let estudiante = $("#estudiante").val();
    let curso = $("#curso").val();
    let notaUno = $("#notaUno").val();
    let notaDos = $("#notaDos").val();
    let notaTres = $("#notaTres").val();

    let notaFinal = notaUno*0.35 + notaDos*0.35 + notaTres*0.30;
    var data = {
        estudiante:estudiante,
        curso:curso,
        notas:[notaUno,notaDos,notaDos],
        notaFinal:notaFinal
    };

    $.ajax({
        url: url+"/matriculas",
        type: "POST",
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (response) {
            alert("Estudiante matriculado")
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("No se pudo matricular al estudiante")
        }
    });
}