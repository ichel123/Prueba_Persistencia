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
            error: function (xhr, status) {
                alert("No se pudo agregar al estudiante")
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
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se pudo agregar el curso")
            }
        });
    }
}
const tamanoConst = function tamano(){
    let div = document.getElementById('notas');
    let elementos = div.getElementsByTagName('input').length;
    return elementos;
    // console.log(elementos);
}
function agregarMatricula() {
    if($("#estudiante").val()==""|| $("#curso").val()=="" || $("#notaUno").val()==""|| $("#notaDos").val()==""|| $("#notaTres").val()==""){
        alert("Todos los campos son obligatorios");
    }
    else{
        let notas = [];
        let tamano = tamanoConst();
        console.log(tamanoConst());
        for(let i=0; i<tamano; i++){
            console.log("entré");
            notas.push($("#nota"+(i+1)).val());
        }
        let estudiante = $("#listaEstudiantes").val();
        let curso = $("#listaCursos").val();

        var data = {
            estudiante:estudiante,
            curso:curso,
            notas:notas
        };
        console.log("Dataplus"+JSON.stringify(data));
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
}

function limpiar(){
    $("#nombres").val("");
    $("#apellidos").val("");
    $("#codigo").val("");
}

//let notaFinal = notaUno*0.35 + notaDos*0.35 + notaTres*0.30;