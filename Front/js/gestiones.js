var url = "http://localhost:3000";

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
                    verCursos();
                }
            },
        });
    }
}
function eliminarMatricula(codigo,curso) {
    var conf = confirm("Seguro que desea eliminar esta matricula?");
    if (conf == true) {
        var data = {
            codigo: codigo,
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
function editarEstudiante(nombres, apellidos, codigo){
    document.getElementById("openEdit").show();

    $("#btnActualizar").show();

    $("#nombres").val(""+nombres+"");
    $("#apellidos").val(""+apellidos+"");
    $("#codigo").val(""+codigo+"");
    document.getElementById("codigo").disabled = true;
}
$(document).ready(function () {
    // eliminarEstudiante(codigo);
});
function modificarEstudiante(codigo) {
    if($("#nombres").val()=="" || $("#apellidos").val()=="" || $("#codigo").val()==""){
        alert("Todos los campos son obligatorios");
    }
    else{
        let data = {
            id: $("#nombres").val(),
            cedula: $("#apellidos").val(),
            nombre: $("#codigo").val()
        }
        $.ajax({
            url: url + "/estudiantes",
            type: "PUT",
            dataType: "json",
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            success: function (response) {
                consultar();
                document.getElementById("modalClose").click();
                alert("El estudiante fue actualizado");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se actualizó correctamente!")
            }
        });
    }
}