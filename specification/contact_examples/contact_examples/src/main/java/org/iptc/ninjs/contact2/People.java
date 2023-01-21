package org.iptc.ninjs.contact2;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.ArrayList;
import java.util.List;

public class People {
  private String name;
  @JsonProperty("contactinfo")
  private List<ContactInfo> contactInfo;

  public People(Builder builder) {
    this.name = builder.name;
    this.contactInfo = builder.contactInfo;
  }

  public static Builder getBuilder() {
    return new Builder();
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public List<ContactInfo> getContactInfo() {
    return contactInfo;
  }

  public void setContactInfo(List<ContactInfo> contactInfo) {
    this.contactInfo = contactInfo;
  }

  public static class Builder {
    private String name;
    private final List<ContactInfo> contactInfo = new ArrayList<>();

    public Builder withName(String name) {
      this.name = name;
      return this;
    }

    public Builder withContactInfo(ContactInfo contactInfo) {
      this.contactInfo.add(contactInfo);
      return this;
    }

    public People build() {
      return new People(this);
    }
  }

}
