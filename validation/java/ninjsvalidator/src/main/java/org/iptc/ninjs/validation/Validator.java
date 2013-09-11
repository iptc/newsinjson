/*
 * Copyright 2013 IPTC - International Press Telecommunications Council - www.iptc.org
 * 25 Southampton Buildings, London WC2A 1AL, United Kingdom
 *
 * This file is published under the Creative Commons Attribution 3.0 license - see the full
 * license agreement at http://creativecommons.org/licenses/by/3.0/.
 *
 * By obtaining, using and/or copying this file, you (the licensee) agree that you have
 * read, understood, and will comply with the terms and conditions of the license.
 */

package org.iptc.ninjs.validation;

import com.fasterxml.jackson.databind.JsonNode;
import com.github.fge.jackson.JsonLoader;
import com.github.fge.jsonschema.exceptions.ProcessingException;
import com.github.fge.jsonschema.main.JsonSchema;
import com.github.fge.jsonschema.main.JsonSchemaFactory;
import com.github.fge.jsonschema.report.ProcessingReport;

import java.io.File;
import java.io.IOException;
import java.net.URL;

/**
 * @author Jeremy Brooks
 */
public class Validator {

	private static final String NINJS_SCHEMA_URL = "http://www.iptc.org/std/ninjs/ninjs-schema_1.0.json";

	private JsonSchema ninjsSchema;

	public Validator() throws IOException, ProcessingException {
		JsonNode schema = JsonLoader.fromURL(new URL(NINJS_SCHEMA_URL));
		this.ninjsSchema = JsonSchemaFactory.byDefault().getJsonSchema(schema);
	}

	public ProcessingReport validate(String jsonString) throws IOException, ProcessingException {
		return validate(JsonLoader.fromString(jsonString));
	}

	public ProcessingReport validate(URL jsonUrl) throws IOException, ProcessingException {
		return validate(JsonLoader.fromURL(jsonUrl));
	}

	public ProcessingReport validate(File jsonFile) throws IOException, ProcessingException {
		return validate(JsonLoader.fromFile(jsonFile));
	}

	public ProcessingReport validate(JsonNode jsonNode) throws IOException, ProcessingException {
		return ninjsSchema.validate(jsonNode);
	}


}
