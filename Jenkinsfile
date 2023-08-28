pipeline {
    agent {
        docker { image 'node:18.17.1-alpine3.18' }
    }

    stages {
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