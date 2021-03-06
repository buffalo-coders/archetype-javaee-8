###
# #%L
# org.buffalo-coders.archetypes.javaee-8
# %%
# Copyright (C) 2018 - 2019 Buffalo Coders
# %%
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
#      http://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# #L%

default: verify

.PHONY: clean
clean:
	@mvn clean

.PHONY: deploy-local
deploy-local:
	@mvn -Dmaven.test.skip=true -DskipTests=true -DaltDeploymentRepository=releases::default::http://archiva.buffalo-coders.org:7000/repository/internal/ deploy

.PHONY: display-updates
display-updates:
	@mvn -Dmaven.version.rules=https://raw.githubusercontent.com/buffalo-coders/parent/master/src/main/resources/versions-maven-plugin.rules.xml \
		versions:display-dependency-updates \
		versions:display-parent-updates \
		versions:display-plugin-updates \
		versions:display-property-updates

.PHONY: install
install:
	@mvn install

.PHONY: release
release: gpg-init no-git-changes
	@mvn --batch-mode --activate-profiles sonatype-oss-release release:prepare release:perform

.PHONY: sonar
sonar:
	@mvn -Dsonar.host.url=http://sonarqube.buffalo-coders.org:9000 sonar:sonar

.PHONY: test
test: verify

.PHONY: verify
verify:
	@mvn verify
