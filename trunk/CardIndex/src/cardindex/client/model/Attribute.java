package cardindex.client.model;

public class Attribute implements com.google.gwt.user.client.rpc.IsSerializable {
	private String strId = null, strAttrType = null, strValue = null, strOldId = null;
	private boolean bModified = false;
	
	public Attribute() {}

	public String getId() {
		return strId;
	}
	
	public String getOldId() {
		return strOldId;
	}

	public void setId( String strArg ) {
		strId = strArg;
		bModified = true;
	}
	
	public String getType() {
		return strAttrType;
	}
	
	public void setType( String strArg ) {
		this.strAttrType = strArg;
		bModified = true;
	}
	
	public String getValue() {
		return strValue;
	}
	
	public void setValue( String strArg ) {
		strValue = strArg;
	}

	public boolean isModified() {
		return bModified;
	}
	
	public void reset() {
		bModified = false;
		strOldId  = strId;
	}
}
