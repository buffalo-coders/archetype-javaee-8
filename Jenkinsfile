#!groovy

pipeline {

  agent any

  tools {
    jdk   'java-1.8'
    maven 'maven-3.5'
  }

  triggers {
    pollSCM('H/5 * * * *')
  }

  stages {

    stage ('Preparation') {
      steps {
        checkout scm
        sh "make clean"
      }
    }

    stage ('Unit Test') {
      steps {
        sh "make verify"
      }

      post {
        always {
          archive '**/target/*.jar'
          archive '**/target/*.war'
          junit allowEmptyResults: true, testResults: '**/target/surefire-reports/*.xml'
        }
      }
    }

    stage ('Static Analysis') {
      when {
        branch 'master'
      }

      steps {
        sh "make sonar"
      }
    }

    stage ('Maven Deployment') {
      when {
        branch 'master'
      }

      steps {
        sh "make deploy-local"
      }
    }

    stage ('Post Build Cleanup') {
      steps {
        sh "make clean"
      }
    }

  }

  post {
    changed {
        slackSend color: "${currentBuild.result == null ? 'good' : currentBuild.result.equals('UNSTABLE') ? 'warning' : 'danger'}",
                  tokenCredentialId: 'fsb-slack',
                  message: "${env.JOB_NAME} - #${env.BUILD_NUMBER} ${currentBuild.currentResult} after ${currentBuild.durationString.replaceAll(' and counting', '')} (<${env.BUILD_URL}|Open>)"
    }
  }

}
