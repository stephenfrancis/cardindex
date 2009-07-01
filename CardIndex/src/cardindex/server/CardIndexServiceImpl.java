package cardindex.server;

import java.sql.ResultSet;
import java.sql.Statement;
import cardindex.client.*;
import cardindex.client.model.Attribute;
import cardindex.client.model.Type;
import cardindex.client.model.Card;
//import com.google.gwt.user.client.ui.Tree;
//import com.google.gwt.user.client.ui.TreeItem;
import com.google.gwt.user.server.rpc.RemoteServiceServlet;

public class CardIndexServiceImpl extends RemoteServiceServlet implements
    CardIndexService {

	static final long serialVersionUID = 20090307L;
	private static Type oRootType = null;
	private java.sql.Connection oConnection = null;

	public CardIndexServiceImpl() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public Type getRootType() {
		if ( oRootType == null ) {
			oRootType = new Type();
			loadType( oRootType );
		}
		return oRootType;
	}

	public Type getTypeByFullId( String strArg ) {
		return getRootType().getTypeByFullId( strArg );
	}

	private void loadType( Type oType ) {
		Statement oStatement = getStatement();
		System.out.println( "Loading Type: " + oType.getFullId() );
		try {
			ResultSet oResultSet = oStatement.executeQuery(
				"select attr, attr_type from type_attr where type='"
				+ oType.getFullId() + "'" );
			while ( oResultSet.next() ) {
				String strAttrName = oResultSet.getString( 1 );
				String strAttrType = oResultSet.getString( 2 );
//				Type oAttrType = getTypeByFullId( strAttrType );
				oType.setAttribute( strAttrName, strAttrType ).reset();
				System.out.println( "Loading Attr: " + strAttrName
					+ ", " + strAttrType );
			}
			oResultSet.close();
			oResultSet = oStatement.executeQuery(
				"select id from type where parent='"
				+ oType.getFullId() + "'" );
			while ( oResultSet.next() ) {
				Type oChild = oType.addChild( oResultSet.getString( 1 ) );
				loadType( oChild );
			}
			oResultSet.close();
		} catch ( Exception e ) {
			System.out.println( e.toString() );
			throw new RuntimeException( e );
		} finally {
			try {
				oStatement.close();
			} catch ( Exception e ) {
				System.out.println( e.toString() );				
			}
		}
	}

	@Override
	public String saveType( Type oType ) {
		Statement oStatement = getStatement();
		java.util.Iterator<Attribute> it = oType.getAttributes();
		try {
			while ( it.hasNext() ) {
				Attribute oAttr = it.next();
				if ( oAttr.isModified() ) {
					String strOriginalId = oAttr.getOldId();
					if ( strOriginalId == null ) {
						System.out.println( "New Attr:" + oAttr.getId() );
						int iRows = oStatement.executeUpdate( "insert into type_attr ( type, attr, attr_type ) values "
							+ " ( '" + oType.getFullId() + "', '" + oAttr.getId() + "', '" + oAttr.getType() + "' )" );
						System.out.println( "Updates:" + iRows );
					} else {
						System.out.println( "Modified Attr:" + oAttr.getId() );
						int iRows = oStatement.executeUpdate( "update type_attr set attr='" + oAttr.getId()
							+ "', attr_type='" + oAttr.getType() + "' where type='" + oType.getFullId()
							+ "' and attr='" + strOriginalId + "'" );
						System.out.println( "Updates:" + iRows );
					}
					oAttr.reset();
				}
			}
		} catch ( Exception e ) {
			System.out.println( e.toString() );
			return "Save Failed due to:" + e.toString();
		} finally {
			try {
				oStatement.close();
			} catch ( Exception e ) {
				System.out.println( e.toString() );				
			}
		}
		return "Save Succeeded";
	}

	@Override
	public java.util.Vector<String[]> search( String strSearch ) {
		java.util.Vector<String[]> vOut = new java.util.Vector<String[]>();
		Statement oStatement = getStatement();
		try {
			oStatement.setMaxRows( 10 );
			ResultSet oResultSet = oStatement.executeQuery(
				"select id, null from type where id like '%" + strSearch + "%'" );
			addMatchTerms( vOut, "type", oResultSet );
			oResultSet = oStatement.executeQuery(
				"select type, attr from type_attr where attr like '%" + strSearch + "%'" );
			addMatchTerms( vOut, "type_attr", oResultSet );
			oResultSet = oStatement.executeQuery(
				"select name, null from card where name like '%" + strSearch + "%'" );
			addMatchTerms( vOut, "card", oResultSet );
			oResultSet = oStatement.executeQuery(
				"select card, attr from card_attr where value like '%" + strSearch + "%'" );
			addMatchTerms( vOut, "card_attr", oResultSet );
		} catch ( Exception e ) {
			System.out.println( e.toString() );
		} finally {
			try {
				oStatement.close();
			} catch ( Exception e ) {
				System.out.println( e.toString() );				
			}
		}
		return vOut;
	}

	private void addMatchTerms( java.util.Vector<String[]> vOut, String strIdent, ResultSet oResultSet ) 
			throws Exception {
		int iMatch = 0;
		while ( oResultSet.next() ) {
			String[] strOut = { strIdent, oResultSet.getString( 1 ), oResultSet.getString( 2 ) };
			vOut.add( strOut );
			iMatch++;
		}
		System.out.println( strIdent + " matches: " + iMatch );				
	}

	public java.sql.Statement getStatement() {
		if ( oConnection == null )
			makeConnection();
		try {
			return oConnection.createStatement(
			ResultSet.TYPE_FORWARD_ONLY, ResultSet.CONCUR_READ_ONLY );
		} catch ( Exception e ) {
			System.out.println( e.toString() );
			throw new RuntimeException( e );
		}
	}
	
	private void makeConnection() {
		try {
			Class.forName( "com.mysql.jdbc.Driver" ).newInstance();
			oConnection = java.sql.DriverManager.getConnection( 
				"jdbc:mysql://localhost:3306/cardindex", "root", "x" );
		} catch ( Exception e ) {
			System.out.println( e.toString() );
			throw new RuntimeException( e );
		}
	}

	public Card getCard( String strName ) {
		Statement oStatement = getStatement();
		System.out.println( "Loading Card: " + strName );
		try {
			ResultSet oResultSet = oStatement.executeQuery(
				"select type, descr from card where name='" + strName + "'" );
			if ( !oResultSet.next() )
				throw new RuntimeException( "Card not found: " + strName );
			Card oCard = new Card();
			oCard.setType( getRootType().getTypeByFullId( oResultSet.getString( 1 ) ) );
			oCard.setDescription( oResultSet.getString( 2 ) );
			oResultSet.close();
			oResultSet = oStatement.executeQuery(
				"select attr, attr_type, value, value_blob from card_attr where card='" + strName + "'" );
			while ( oResultSet.next() ) {
				String strAttrName = oResultSet.getString( 1 );
				String strAttrType = oResultSet.getString( 2 );
				String strAttrVal  = oResultSet.getString( 3 );
				oCard.setAttribute( strAttrName, strAttrType ).setValue( strAttrVal );
				System.out.println( "Loading Attr: " + strAttrName + ", " + strAttrType );
			}
			oResultSet.close();
			return oCard;
		} catch ( Exception e ) {
			System.out.println( e.toString() );
			if ( e instanceof RuntimeException )
				throw (RuntimeException)e;
			throw new RuntimeException( e );
		} finally {
			try {
				oStatement.close();
			} catch ( Exception e ) {
				System.out.println( e.toString() );				
			}
		}
	}

}
