package org.iptc.ninjs.contact2;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

@JsonPropertyOrder({"name", "rel", "uri", "literal", "symbols", "contactinfo"})
public class Organisation {
  private String name;
  private String rel;
  private String uri;
  private String literal;
  private List<Symbol> symbols = new ArrayList<>();

  @JsonProperty("contactinfo")
  private List<ContactInfo> contactInfo = new ArrayList<>();

  private Organisation(){}

  private Organisation(Builder builder) {
    this.setName(builder.name);
    this.setRel(builder.rel);
    this.setUri(builder.uri);
    this.setLiteral(builder.literal);
    this.setSymbols(builder.symbols);
    this.setContactInfo(builder.contactInfo);
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

  public String getRel() {
    return rel;
  }

  public void setRel(String rel) {
    this.rel = rel;
  }

  public String getUri() {
    return uri;
  }

  public void setUri(String uri) {
    this.uri = uri;
  }

  public String getLiteral() {
    return literal;
  }

  public void setLiteral(String literal) {
    this.literal = literal;
  }

  public List<Symbol> getSymbols() {
    return symbols;
  }

  public void setSymbols(List<Symbol> symbols) {
    this.symbols = symbols;
  }

  public List<ContactInfo> getContactInfo() {
    return contactInfo;
  }

  public void setContactInfo(List<ContactInfo> contactInfo) {
    this.contactInfo = contactInfo;
  }

  public static class Builder {
    private String name;
    private String rel;
    private String uri;
    private String literal;
    private List<Symbol> symbols = new ArrayList<>();
    private List<ContactInfo> contactInfo = new ArrayList<>();

    public Builder withName(String name) {
      this.name = name;
      return this;
    }
    public Builder withRel(String rel) {
      this.rel = rel;
      return this;
    }
    public Builder withUri(URI uri) {
      this.uri = uri.toString();
      return this;
    }
    public Builder withUri(String uri) throws Exception {
      try {
        return withUri(new URI(uri));
      } catch (URISyntaxException use) {
        throw new Exception("Invalid URI: " + uri, use);
      }
    }
    public Builder withLiteral(String literal) {
      this.literal = literal;
      return this;
    }
    public Builder withSymbol(Symbol symbol) {
      this.symbols.add(symbol);
      return this;
    }

    public Builder withContactInfo(ContactInfo contactInfo) {
      this.contactInfo.add(contactInfo);
      return this;
    }
    public Organisation build() {
      return new Organisation(this);
    }
  }

}
