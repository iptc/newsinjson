package org.iptc.ninjs.contact1;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

/**
 * <pre>
 * {@code
 * People:
 * Brendan Quinn
 * @brendanquinn (Twitter)
 *
 * Johan Lindgren
 * Gnejsvägen 24, 85357 Sundsvall, Sweden (home address)
 * kräftdjur.lövträd.kvar (home address, what3words)
 * animated.goes.sank (home address, what3words)
 * 0706528007 (mobile)
 * 086922600 (office phone)
 *
 * Organisations:
 * Business Wire
 * 101 California Street
 * 20th Floor
 * San Francisco, CA 94111
 * 415-986-4422 (office phone)
 * 415-956-2609 (office fax)
 * fruit.insert.left (office, what3words)
 * @businesswire (twitter)
 * https://www.instagram.com/businesswire/ (instagram)
 * }
 * </pre>
 */
public class Main1 {

  public static void main(String[] args) throws Exception {
    Organisation bw = Organisation.getBuilder()
        .withName("Business Wire")
        .withContactInfo(ContactInfo.getBuilder()
            .withName("address")
            .withRole("office")
            .withAddress("address", "101 California Street")
            .withAddress("address", "20th Floor")
            .withAddress("city", "San Francisco")
            .withAddress("state", "CA")
            .withAddress("zip", "94111")
            .withAddress("country", "United States")
            .build())
        .withContactInfo(ContactInfo.getBuilder()
            .withType("what3words")
            .withRole("office")
            .withValue("https://what3words.com/fruit.insert.left")
            .build())
        .withContactInfo(ContactInfo.getBuilder()
            .withType("phone")
            .withRole("office")
            .withValue("415-986-4422")
            .build())
        .withContactInfo(ContactInfo.getBuilder()
            .withType("fax")
            .withRole("office")
            .withValue("415-956-2609")
            .build())
        .withContactInfo(ContactInfo.getBuilder()
            .withType("twitter")
            .withRole("social")
            .withName("Business Wire on Twitter")
            .withValue("https://www.twitter.com/businesswire")
            .build())
        .withContactInfo(ContactInfo.getBuilder()
            .withType("instagram")
            .withRole("social")
            .withName("Business Wire on Instagram")
            .withValue("https://www.instagram.com/businesswire")
            .build())
        .withContactInfo(ContactInfo.getBuilder()
            .withName("phone")
            .withRole("office")
            .withValue("")
            .build())
        .build();

    People brendan = People.getBuilder()
        .withName("Brendan Quinn")
        .withContactInfo(ContactInfo.getBuilder()
            .withType("email")
            .withRole("office")
            .withValue("mdirector@iptc.org")
            .build())
        .withContactInfo(ContactInfo.getBuilder()
            .withType("twitter")
            .withRole("personal")
            .withValue("https://www.twitter.com/brendanquinn")
            .withName("@brendanquinn")
            .build())
        .withContactInfo(ContactInfo.getBuilder()
            .withType("twitter")
            .withRole("official")
            .withValue("https://twitter.com/iptc")
            .withName("@IPTC")
            .build())
        .withContactInfo(ContactInfo.getBuilder()
            .withType("address")
            .withRole("official")
            .withAddress("street", "25 Southamption Buildings")
            .withAddress("city", "London")
            .withAddress("postcode", "WC2A 1AL")
            .withAddress("country", "United Kingdom")
            .build())
        .build();

    People johan = People.getBuilder()
        .withName("Johan Lindgren")
        .withContactInfo(ContactInfo.getBuilder()
            .withType("address")
            .withRole("home")
            .withAddress("street", "Gnejsvägen 24")
            .withAddress("city", "Sundsvall")
            .withAddress("postcode", "85357")
            .withAddress("country", "Sweden")
            .build())
        .withContactInfo(ContactInfo.getBuilder()
            .withType("address")
            .withRole("what3words")
            .withLang("en")
            .withValue("https://what3words.com/animated.goes.sank")
            .build())
        .withContactInfo(ContactInfo.getBuilder()
            .withType("address")
            .withRole("what3words")
            .withLang("sv")
            .withValue("https://what3words.com/kräftdjur.lövträd.kvar")
            .build())
        .withContactInfo(ContactInfo.getBuilder()
            .withType("mobile")
            .withRole("private")
            .withValue("0706528007")
            .build())
        .withContactInfo(ContactInfo.getBuilder()
            .withType("phone")
            .withRole("office")
            .withValue("086922600")
            .build())
        .build();

    Ninjs ninjs = Ninjs.getBuilder()
        .withUri("contact-sample-version-1")
        .withOrganisation(bw)
        .withPeople(brendan)
        .withPeople(johan)
        .build();

    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.setSerializationInclusion(Include.NON_NULL);
    objectMapper.setSerializationInclusion(Include.NON_EMPTY);
    ObjectWriter objectWriter = objectMapper.writerWithDefaultPrettyPrinter();

    System.out.println(objectWriter.writeValueAsString(ninjs));


  }
}
