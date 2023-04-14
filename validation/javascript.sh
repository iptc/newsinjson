#!/bin/bash

# assumes that ajv, ajv-cli and ajv-formats are installed:
# npm install -g ajv ajv-cli ajv-formats

# call function as: validate_folder_against_schema folder_path schema_file_path valid/invalid
validate_folder_against_schema () {
    TEST_FOLDER=$1
    SCHEMA_FILE=$2
    if [[ $3 = "invalid" ]]
    then
        VALIDSTR='--invalid'
    else
        VALIDSTR='--valid'
    fi
    for filename in ${TEST_FOLDER}/*; do
        ajv test --spec=draft2020 -r test_suite/GeoJSON-schema.json -s "${SCHEMA_FILE}" -c=ajv-formats -d="${filename}" "${VALIDSTR}"
    done
}

echo "The following tests should pass:"
validate_folder_against_schema 'test_suite/2.1/should_pass' '../specification/ninjs-schema_2.1.json' valid
validate_folder_against_schema '../examples/2.1' '../specification/ninjs-schema_2.1.json' valid

echo "The following examples should fail validation:"
validate_folder_against_schema 'test_suite/2.1/should_fail' '../specification/ninjs-schema_2.1.json' invalid
