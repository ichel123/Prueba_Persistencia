var url = "http://localhost:3000";
var cursoLista;
var estudianteLista;
var notasCurso;

// DELETE
// ESTUDIANTE
function eliminarEstudiante(codigo) {
    var conf = confirm("Seguro que desea eliminar al estudiante?");
    if (conf == true) {
        var data = {
            codigo: codigo
        }
        $.ajax({
            url: url+"/estudiantes",
            type: "DELETE",
            dataType: "json",
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                204: function () {
                    verEstudiantes();
                }
            },
        });
    }
}

// CURSO
function eliminarCurso(nombre) {
    console.log(nombre);
    var conf = confirm("Seguro que desea eliminar el curso "+nombre+"?");
    if (conf == true) {
        var data = {
            nombre: nombre
        }
        $.ajax({
            url: url+"/cursos",
            type: "DELETE",
            dataType: "json",
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                204: function () {
                    verMatriculas();
                }
            },
        });
    }
}

// MATRICULA
function eliminarMatricula(codigo,curso) {
    var conf = confirm("Seguro que desea eliminar esta matricula?");
    if (conf == true) {
        var data = {
            estudiante: codigo,
            curso: curso
        }
        $.ajax({
            url: url+"/matriculas",
            type: "DELETE",
            dataType: "json",
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                204: function () {
                    verCursos();
                }
            },
        });
    }
}

// PUT
// CURSO
function editarCurso(nombre, tipo, creditos){
    $("#nombreCurso").val(""+nombre+"");
    $("#tipoCurso").val(""+tipo+"");
    document.getElementById("tipoCurso").disabled = true;
    $("#creditos").val(""+creditos+"");
}

function actualizarCurso() {
    if($("#nombreCurso").val()=="" || $("#tipoCurso").val()=="" || $("#creditos").val()==""){
        alert("Todos los campos son obligatorios");
    }
    else{
        let data = [{nombre: $("#nombreCurso").val()}, {creditos: $("#creditos").val()}]
        console.log(data);
        $.ajax({
            url: url + "/cursos",
            type: "PUT",
            //dataType: "json",
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            success: function (response) {
                verCursos()
                alert("Curso actualizado");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se pudo actualizar correctamente!")
            }
        });
    }
}



function editarEstudiante(nombres, apellidos, codigo){
    $("#nombres").val(""+nombres+"");
    $("#apellidos").val(""+apellidos+"");
    $("#codigo").val(""+codigo+"");
    document.getElementById("codigo").disabled = true;
}

function actualizarEstudiante() {
    if($("#nombres").val()=="" || $("#apellidos").val()=="" || $("#codigo").val()==""){
        alert("Todos los campos son obligatorios");
    }
    else{
        let data  =[{codigo:$("#codigo").val()},[{nombres: $("#nombres").val(), apellidos: $("#apellidos").val()}]];
        console.log(data);
        console.log(data)
        $.ajax({
            url: url + "/estudiantes",
            type: "PUT",
            //dataType: "json",
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            success: function (response) {
                verEstudiantes();
                alert("El estudiante fue actualizado");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se actualizó correctamente!")
            }
        });
    }
}



function editarMatricula(estudiante, curso, notas){
    estudianteLista = estudiante;
    cursoLista = curso;
    getCursoValue(curso);
    notasCurso = notas.split(",")
    //console.log(n.length);

    $("#listaEstudiantes").val(""+estudiante+"");
    $("#listaCursos").val(""+curso+"");
    setTimeout(auxiliar, 300);
    getCursoValue(""+curso+"");
    document.getElementById("listaEstudiantes").disabled = true;
    document.getElementById("listaCursos").disabled = true;
}

function auxiliar(){
    $("#listaEstudiantes").val(""+estudianteLista+"");
    $("#listaCursos").val(""+cursoLista+"");

    for(let i=0; i<notasCurso.length; i++){
        console.log("#nota"+(i+1)+" - "+notasCurso[i])
        $("#nota"+(i+1)).val(notasCurso[i]);
    }
}


function actualizarMatricula() {
    if((notasCurso.length==3 && ($("#listaEstudiantes").val()=="" || $("#listaCursos").val()=="" || $("#nota1").val()=="" || $("#nota2").val()==""|| $("#nota3").val()=="")) || (notasCurso.length==4 && ($("#listaEstudiantes").val()=="" || $("#listaCursos").val()=="" || $("#nota1").val()=="" || $("#nota2").val()==""|| $("#nota3").val()=="") || $("#nota4").val()=="")){
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

        console.log(data)
        $.ajax({
            url: url + "/estudiantes",
            type: "PUT",
            //dataType: "json",
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            success: function (response) {
                verMatriculas();
                alert("El estudiante fue actualizado");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se actualizó correctamente!")
            }
        });
    }
}