#!/bin/bash

# assumes that ajv, ajv-cli and ajv-formats are installed:
# npm install -g ajv ajv-cli ajv-formats

# call function as: validate_folder_against_schema specstring folder_path schema_file_path valid/invalid
validate_folder_against_schema () {
    SPEC_STRING=$1
    TEST_FOLDER=$2
    SCHEMA_FILE=$3
    if [[ $4 = "invalid" ]]
    then
        VALIDSTR='--invalid'
    else
        VALIDSTR='--valid'
    fi
    GEOJSON=''
    if [[ $SPEC_STRING == "draft2020" ]]
    then
        GEOJSON='-r test_suite/GeoJSON-schema.json'
    fi
        
    for filename in ${TEST_FOLDER}/*; do
        ajv test --spec="${SPEC_STRING}" ${GEOJSON} -s "${SCHEMA_FILE}" -c=ajv-formats -d="${filename}" "${VALIDSTR}"
    done
}

cd "$(dirname "$0")"

echo "--- ninjs 2.1 tests ---"
echo

echo "The following tests should pass:"
validate_folder_against_schema draft2020 'test_suite/2.1/should_pass' '../specification/ninjs-schema_2.1.json' valid
validate_folder_against_schema draft2020 '../examples/2.1' '../specification/ninjs-schema_2.1.json' valid

echo "The following examples should fail validation:"
validate_folder_against_schema draft2020 'test_suite/2.1/should_fail' '../specification/ninjs-schema_2.1.json' invalid

echo "--- ninjs 1.5 tests ---"
echo
validate_folder_against_schema draft7 'test_suite/1.5/should_pass' '../specification/ninjs-schema_1.5.json' valid
validate_folder_against_schema draft7 '../examples/1.5' '../specification/ninjs-schema_1.5.json' valid

echo "The following examples should fail validation:"
validate_folder_against_schema draft7 'test_suite/1.5/should_fail' '../specification/ninjs-schema_1.5.json' invalid

echo "--- ninjs 2.1-dev tests ---"
echo
validate_folder_against_schema draft2020 'test_suite/2.x_dev/should_pass' '../specification/ninjs-schema-dev_0.1_v2.1.json' valid

echo "The following examples should fail validation:"
validate_folder_against_schema draft2020 'test_suite/2.x_dev/should_fail' '../specification/ninjs-schema-dev_0.1_v2.1.json' invalid

echo "--- ninjs 1.5-dev tests ---"
echo
validate_folder_against_schema draft7 'test_suite/1.x_dev/should_pass' '../specification/ninjs-schema-dev_0.2_v1.5.json' valid

echo "The following examples should fail validation:"
validate_folder_against_schema draft7 'test_suite/1.x_dev/should_fail' '../specification/ninjs-schema-dev_0.2_v1.5.json' invalid

# Go back to the pwd where the user started
cd -
