pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "tonytran1997/mongo-app:${env.BRANCH_NAME}-${env.BUILD_ID}"  // Image với tag branch-BUILD_ID
        LATEST_IMAGE = "tonytran1997/mongo-app:staging-latest"  // Image mới nhất cho môi trường staging
        K8S_API_URL = 'https://103.173.66.104:6443'
        KUBECONFIG_CREDENTIALS_ID = 'k8s-staging-jenkins-sa-token'
        NAMESPACE = 'staging'
    }
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    // Build image Docker với tên và tag cụ thể
                    dockerImage = docker.build(env.DOCKER_IMAGE)
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    // Push image lên Docker Hub với tag branch và latest
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        dockerImage.push("${env.BRANCH_NAME}-${env.BUILD_ID}")
                        dockerImage.push("staging-latest")  // Tag mới nhất cho staging
                    }
                }
            }
        }
        stage('Check Kubernetes Connection') {
            steps {
                script {
                    // Kiểm tra kết nối với Kubernetes API
                    withCredentials([string(credentialsId: "${KUBECONFIG_CREDENTIALS_ID}", variable: 'KUBE_TOKEN')]) {
                        sh "curl --insecure --header 'Authorization: Bearer ${KUBE_TOKEN}' ${K8S_API_URL}/api/v1/nodes"
                    }
                }
            }
        }
        stage('Verify Deployment YAML Exists') {
            steps {
                script {
                    sh "ls -la"
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    withCredentials([string(credentialsId: "${KUBECONFIG_CREDENTIALS_ID}", variable: 'KUBE_TOKEN')]) {
                        // Checkout code từ GitHub để lấy deployment.yaml
                        checkout scm

                        // Thiết lập context cho kubectl bằng token
                        sh """
                            kubectl config set-credentials jenkins-user --token=${KUBE_TOKEN}
                            kubectl config set-cluster jenkins-cluster --server=${K8S_API_URL} --insecure-skip-tls-verify=true
                            kubectl config set-context jenkins-context --cluster=jenkins-cluster --user=jenkins-user --namespace=${NAMESPACE}
                            kubectl config use-context jenkins-context
                        """

                        // Triển khai file deployment.yaml lên Kubernetes
                        sh "kubectl apply -f deployment.yaml --namespace=${NAMESPACE}"

                        // Triển khai file service.yaml lên Kubernetes
                        sh "kubectl apply -f service.yaml --namespace=${NAMESPACE}"

                        // Cập nhật image trong deployment bằng image mới nhất
                        sh "kubectl set image deployment/mongodb mongodb=${LATEST_IMAGE} --namespace=${NAMESPACE}"
                    }
                }
            }
        }
    }
}
