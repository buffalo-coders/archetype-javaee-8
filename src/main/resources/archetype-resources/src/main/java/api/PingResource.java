#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
package ${package}.api;

/*
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
*/

import java.util.Date;

import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api("ping")
@Path("ping")
public class PingResource {

	@ApiOperation("")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JsonObject getAsJson() {
		return Json.createObjectBuilder().add("pong", "" + new Date()).build();
	}

	@ApiOperation("")
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String getAsHtml() {
		return "<html><body><h1>pong " + new Date() + "</h1></body></html>";
	}

	@ApiOperation("")
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String getAsText() {
		return "pong " + new Date();
	}

}
