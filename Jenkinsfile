pipeline {
    agent any

    stages {
        stage('Install Packagaes') {
            steps {
                sh 'npm i'
            }
        }
        stage('Deploy AWS Lambda Function') {
            steps {
                sh 'serverless deploy --region ap-south-1'
            }
        }
    }
}