package cardindex.client.model;

public class Card implements com.google.gwt.user.client.rpc.IsSerializable {

	private String strName = null, strDescr = null;
	private Type oType = null;
	private java.util.Vector<Attribute> vAttr = null;

	public Card() {}

	public String getName() {
			return strName;
	}

	public void setName( String strArg ) {
		strName = strArg;
	}

	public Type getType() {
		return oType;
	}
	
	public void setType( Type oType ) {
		this.oType = oType;
	}

	public String getDescription() {
		return strDescr;
	}
	
	public void setDescription( String strArg ) {
		strDescr = strArg;
	}

	public Attribute setAttribute( String strAttr, String strAttrType ) {
		if ( vAttr == null )
			vAttr = new java.util.Vector<Attribute>();
		Attribute oAttr = null;
		for ( int iX = 0; vAttr.size() < iX; iX++ ) {
			if ( vAttr.get( iX ).getId().equals( strAttr ) )
				oAttr = vAttr.get( iX );
		}
		if ( oAttr == null ) {
			oAttr = new Attribute();
			oAttr.setId( strAttr );
			vAttr.add( oAttr );
		}
		oAttr.setType( strAttrType );
		return oAttr;
	}

	public Attribute getAttribute( int iX ) {
		if ( vAttr == null )
			return null;
		return vAttr.get( iX );
	}

	public int getAttributeCount() {
		if ( vAttr == null )
			return 0;
		return vAttr.size();
	}

	public java.util.Iterator<Attribute> getAttributes() {
		if ( vAttr == null )
			return null;
		else
			return vAttr.iterator();
	}

}