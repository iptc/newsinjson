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

import com.github.fge.jsonschema.report.ProcessingReport;
import org.junit.Test;

import java.net.URL;

import static junit.framework.Assert.assertFalse;
import static junit.framework.Assert.assertTrue;

/**
 * Demonstrates how to use the json-schema-validator library to validate a ninjs document.
 *
 * @author Jeremy Brooks
 */
public class ValidatorTest {

	/**
	 * Run validation against a valid ninjs document.
	 *
	 * This junit test is designed to verify that a valid document is reported as valid.
	 *
	 * @throws Exception
	 */
	@Test
	public void testValidate() throws Exception {
		Validator validator = new Validator();
		URL resource = ValidatorTest.class.getResource("/ninjs_example_simple.json");
		ProcessingReport report = validator.validate(resource);
		assertTrue(report.isSuccess());
		System.out.println(report.toString());
	}


	/**
	 * Run validation against an invalid ninjs document.
	 *
	 * This junit test is designed to verify that an invalid document is reported as invalid.
	 * A "success" on this test means that the invalid document was correctly detected as invalid.
	 *
	 * The invalid document contains an invalid property.
	 * The printed report should indicate the name of the invalid property.
	 *
	 * @throws Exception
	 */
	@Test
	public void testInvalid() throws Exception {
		Validator validator = new Validator();

		URL resource = ValidatorTest.class.getResource("/ninjs_example_invalid.json");
		ProcessingReport report = validator.validate(resource);
		assertFalse(report.isSuccess());
		System.out.println(report.toString());
	}
}
