<template>
    <div class="home">
        <h1>Certifier</h1>

        <form @submit.prevent="save" v-if="isOwner">
            <div class="form-group">
                <label for="courseCode">Código curso</label>
                <input type="text" class="form-control" id="coursecode" placeholder="Código curso" v-model="form.courseCode">
                <!--Reactividad-->
                <!--{{form.courseCode}}-->
            </div>
            <div class="form-group">
                <label for="courseName">Nombre del curso</label>
                <input type="text" class="form-control" id="courseName" placeholder="Nombre curso" v-model="form.courseName">
            </div>
            <div class="form-group">
                <label for="courseCost">Costo del curso</label>
                <input type="number" class="form-control" id="courseCost" placeholder="Costo del curso" v-model="form.courseCost">
            </div>
            <div class="form-group">
                <label for="courseDuration">Duración del curso</label>
                <input type="number" class="form-control" id="courseDuration" placeholder="Duración del curso" v-model="form.courseDuration">
            </div>
            <div class="form-group">
                <label for="courseThreshold">Umbral del curso</label>
                <input type="number" class="form-control" id="courseThreshold" placeholder="Umbral del curso" v-model="form.courseThreshold">
            </div>
            <div class="form-group">
                <button class="btn btn-success" @click="sessions++">Agregar sesion</button>
                &nbsp;
                <!--v-if sessions si v_session its null its hides the button-->
                <button class="btn btn-danger" @click="sessions--" v-if="sessions">Borrar sesion</button>
            </div>
            <!--idx empieza desde 0, por eso se crea code que vaya desde 1-->
            <div class="form-group" v-for="(code, idx) in sessions" v-if="sessions">
                <input type="text" class="form-control" :placeholder="`Sessions ${code}`" v-model="form.course[idx]">
            </div>
            <button type="submit" class="btn btn-primary">Subir</button>
        </form>
        <div class="alert alert-danger" role="alert" v-else>
            No eres el dueño o No has iniciado sesión o No tienes Metamask
        </div>
        {{form}}
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'
    import {mapActions, mapState} from 'vuex'
    import * as constants from '@/store/constants'

    export default {
        name: 'home',
        // información atada al componente y es reactivo
        // reactivo -> c = a + b reacciona a los cambios de la ecuación
        data() {
            return {
                sessions: 1,
                form:{
                    courseCode: null,
                    courseName: null,
                    courseCost:null,
                    courseDuration: null,
                    courseThreshold: null,
                    course: []
                }
            }
        },
        computed: {
            ...mapState({
                isOwner: state => state.Course.isOwner //state.module.property -> Course
            })
        },
        methods: {
            ...mapActions({
                init: constants.COURSE_INIT,
                addCourse: constants.COURSE_ADD_COURSE
            }),
            save () {
                this.addCourse(this.form) //console.log(JSON.stringify(this.form))
            }
        },
        created () {
            this.init()
        }
    }
</script>
