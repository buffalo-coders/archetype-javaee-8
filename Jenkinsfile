#!groovy

/*-
 * #%L
 * org.buffalo-coders.archetypes.javaee-8
 * %%
 * Copyright (C) 2018 - 2019 Buffalo Coders
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * #L%
 */

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
