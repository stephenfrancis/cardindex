package cardindex.client.model;


public class Type implements com.google.gwt.user.client.rpc.IsSerializable {

	private String strId = null, strFullId = null;
	private Type oParent = null;
	private java.util.Vector<Type> vChild = null;
	private java.util.Vector<Attribute> vAttr = null;
	
	public Type() {}
	
	public String getId() {
		if ( strId == null )
			return "Root";
		else
			return strId;
	}
	
	public void setId( String strArg ) {
		strId = strArg;
	}
	
	public Type getParent() {
		return oParent;
	}
	
	public Type addChild( String strArg ) {
		Type oChild = new Type();
		oChild.setId( strArg );
		oChild.oParent = this;
		if ( vChild == null )
			vChild = new java.util.Vector<Type>();
		vChild.add( oChild );
		return oChild;
	}
	
	public java.util.Iterator<Type> getChildren() {
		if ( vChild == null )
			return null;
		else
			return vChild.iterator();
	}

	public String getFullId() {
		if ( strFullId != null )
			return strFullId;
		if ( oParent == null )
			strFullId = "/";
		else
			strFullId = oParent.getFullId() + " " + strId + " /";
		return strFullId;
	}
	
	public Type getTypeById( String strArg ) {
		if ( strArg.equals( this.strId ) )
			return this;
		for ( int iX = 0; vChild != null && iX < vChild.size(); iX++ ) {
			Type oType = vChild.get( iX ).getTypeById( strArg );
			if ( oType != null )
				return oType;
		}
		return null;
	}
	
	public Type getTypeByFullId( String strArg ) {
		if ( strArg.equals( this.strFullId ) )
			return this;
		for ( int iX = 0; vChild != null && iX < vChild.size(); iX++ ) {
			Type oType = vChild.get( iX ).getTypeByFullId( strArg );
			if ( oType != null )
				return oType;
		}
		return null;
	}
	
	public int getLevel() {
		if ( oParent == null )
			return 0;
		else
			return oParent.getLevel() + 1;
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
