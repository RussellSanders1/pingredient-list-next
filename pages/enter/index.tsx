import { signInWithPopup } from 'firebase/auth';
import { addDoc, doc, getDoc, writeBatch } from 'firebase/firestore';
import debounce from 'lodash.debounce';
import type { NextPage } from 'next';
import React, {
  ChangeEventHandler, FormEventHandler, useCallback, useEffect, useState,
} from 'react';
import { auth, db, firestore, googleAuthProvider } from '../../lib/firebase';
import { createDummyIngredientList } from '../../lib/helpers';
import List from '../../lib/models/list';
import ListType from '../../lib/types/listType';
import { useAuthContext } from '../../lib/useAuthContext';

interface MessageProps {
  username: string;
  isValid: boolean;
  loading: boolean;
}

var UsernameMessage = function ({ username, isValid, loading }: MessageProps) {
  if (loading) {
    return <p>Checking...</p>;
  } if (isValid) {
    return (
      <p className="text-success">
        {username}
        {' '}
        is available!
      </p>
    );
  } if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  }
  return <p />;
};

var SignInButton = function () {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src="/google.png" alt="google" />
      {' '}
      Sign in with Google
    </button>
  );
};

var SignOutButton = function () {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
};

var UsernameForm = function () {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, username } = useAuthContext();

  const checkUsername = useCallback(async (usernameValue) => {
    const call = debounce(async (value: string) => {
      if (value.length >= 3) {
        const ref = doc(firestore, 'usernames', value);

        const document = await getDoc(ref);
        console.log('Firestore read executed!');
        setIsValid(!document.exists());
        setLoading(false);
      }
    }, 500);
    await call(usernameValue);
  }, []);
  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // Create refs for both documents
    const currentUser = user!;
    const userDoc = doc(firestore, 'users', currentUser.uid);
    const usernameDoc = doc(firestore, 'usernames', formValue);
    const inventory = new List('Inventory', ListType.Inventory, createDummyIngredientList());
    // Commit both docs together as a batch write.
    const batch = writeBatch(firestore);
    batch.set(userDoc, {
      username: formValue,
      photoURL: currentUser.photoURL,
      displayName: user!.displayName,
    });
    batch.set(usernameDoc, { uid: currentUser.uid });
    await batch.commit();

    const inventoryDoc = await addDoc(db.userLists(currentUser.uid), inventory);
    if (!(await getDoc(inventoryDoc)).exists()) {
      console.error(`Default list not created for user ${currentUser.uid}`);
    }
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  return (
    <>
      {!username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage username={formValue} isValid={isValid} loading={loading} />

          <button type="submit" className="btn-green" disabled={!isValid}>
            Choose
          </button>

          <h3>Debug State</h3>
          <div>
            Username:
            {' '}
            {formValue}
            <br />
            Loading:
            {' '}
            {loading.toString()}
            <br />
            Username Valid:
            {' '}
            {isValid.toString()}
          </div>
        </form>
      </section>
      )}
    </>
  );
};

const EnterPage: NextPage = function () {
  const { user, username } = useAuthContext();

  return (
    <main>
      {user
        ? !username ? <UsernameForm /> : <SignOutButton />
        : <SignInButton />}
    </main>
  );
};

export default EnterPage;
