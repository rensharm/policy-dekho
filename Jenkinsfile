pipeline {
    agent any

    stages {
        stage("Initialize"){
            steps {
                sh def dockerHome = tool 'myDocker'
                sh env.PATH = "${dockerHome}/bin:${env.PATH}"
            }
        }
        stage("verify tooling") {
            steps  {
                sh '''
                    docker version
                    docker info
                    docker compose version
                    curl --version
                    jq --version
                '''

            }
        }
    }
}