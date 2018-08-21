#
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
#

default: install

.PHONY: clean
clean:
	@mvn clean

.PHONY: install
install: clean
	@mvn install

.PHONY: install-fast
install-fast: clean
	@mvn -Dmaven.test.skip=true -DskipTests=true install

.PHONY: run
run: run-thorntail

.PHONY: run-thorntail
run-thorntail: clean
	@mvn io.thorntail:thorntail-maven-plugin:run

.PHONY: test
test: verify

.PHONY: validate
validate: clean
	@mvn validate

.PHONY: verify
verify: clean
	@mvn verify
