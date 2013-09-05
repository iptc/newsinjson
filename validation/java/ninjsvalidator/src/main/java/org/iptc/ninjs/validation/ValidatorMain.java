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

import java.io.File;

/**
 * Most basic use of the JSON Validator
 * This will allow a user to pass a path to one or more ninjs documents and have the validator
 * check it
 *
 * @author Jayson Lorenzen
 */
public class ValidatorMain {


	public static void main(String... args) throws Exception {
			if (args.length == 0) {
				throw new IllegalArgumentException("No arguments provided: You must provide one or more files to process.");
			}
			Validator validator = new Validator();
			for (String filename : args) {
				ProcessingReport report = validator.validate(new File(filename));
				if (report.isSuccess()) {
					System.out.println(filename + ": OK");
				} else {
					System.out.println(filename + ": FAILED");
					System.out.println(report);
				}
			}
		}
}